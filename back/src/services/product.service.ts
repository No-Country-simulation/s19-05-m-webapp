import { productRepository } from "../repositories/product.repository";
import { Product } from "../entity/Product.entity";
import { platformRepository } from "../repositories/platform.repository";
import { PlatformService } from "./platform.service";
import { In } from "typeorm";

export class ProductService {
  private readonly platformService: PlatformService;

  constructor() {
    this.platformService = new PlatformService();
  }

  async getAllProducts(): Promise<Product[]> {
    return await productRepository.find({
      relations: ["platforms"],
    });
  }

  async getProductsWithLimit(limit: number) {
    try {
      return await productRepository
        .createQueryBuilder("product")
        .leftJoinAndSelect("product.platforms", "platform")
        .take(limit) // Limita la cantidad de productos a devolver
        .getMany();
    } catch (error) {
      console.error("Error fetching products:", error);
      throw new Error("Failed to fetch products");
    }
  }

  async getProductById(id: number): Promise<Product | null> {
    try {
      return await productRepository.findOne({
        where: { id_product: id },
        relations: ["platforms"],
      });
    } catch (error) {
      console.error("Error in ProductService (getProductById):", error);
      throw new Error("Failed to fetch product by ID");
    }
  }

  async createProduct(productData: Partial<Product>): Promise<Product> {
    try {
      const { platforms, ...productDetails } = productData;

      //crear el producto sin plataformas
      const newProduct = productRepository.create(productDetails);

      if (platforms && Array.isArray(platforms)) {
        //obtener o crear las plataformas
        const allPlatforms = await this.platformService.findOrCreatePlatforms(
          platforms
        );
        newProduct.platforms = allPlatforms;
      }

      await productRepository.save(newProduct);

      return newProduct;
    } catch (error) {
      console.error("Error creating product (createProduct):", error);
      throw new Error("Failed to create product");
    }
  }

  async updateProduct(
    id: number,
    productData: Partial<Product>
  ): Promise<Product | null> {
    try {
      const product = await productRepository.findOne({
        where: { id_product: id },
        relations: ["platforms"],
      });
      if (!product) return null;

      const { platforms, ...productDetails } = productData;

      //actualizar el producto sin las pltformas (merge)
      productRepository.merge(product, productDetails);

      //si hay plataformas nuevas
      if (platforms && Array.isArray(platforms)) {
        const allPlatforms = await this.platformService.findOrCreatePlatforms(
          platforms
        );
        product.platforms = allPlatforms;
      } else {
        product.platforms = [];
      }

      //gardar el producto al final
      const updatedProduct = await productRepository.save(product, {
        reload: true, //reload para evitar llamados extra
      });

      return updatedProduct;
    } catch (error) {
      console.error("Error updating product (updateProduct):", error);
      throw new Error("Failed to update product");
    }
  }

  async deleteProduct(id: number) {
    try {
      const product = await productRepository.findOne({
        where: { id_product: id },
      });
      if (!product) throw new Error(`Product with ID ${id} not found`);
      return await productRepository.remove(product);
    } catch (error) {
      console.error("Error in ProductService (deleteProduct):", error);
      throw new Error("Failed to delete product");
    }
  }

  async getProductsByPlatform(platform: string): Promise<Product[]> {
    try {
      return await productRepository
        .createQueryBuilder("product")
        .innerJoinAndSelect("product.platforms", "platform")
        .where("platform.name = :platform", { platform })
        .getMany();
    } catch (error) {
      console.error("Error fetching products by platform:", error);
      throw new Error("Failed to fetch products by platform");
    }
  }

  async getProductsByGenre(genre: string): Promise<Product[]> {
    try {
      console.log("Searching for products with genre:", genre);
      return await productRepository.find({
        where: { genre },
        relations: ["platforms"],
      });
    } catch (error) {
      console.error("Error fetching products by genre:", error);
      throw new Error("Failed to fetch products by genre");
    }
  }
}
