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

      //crear producto sin plataformas
      const newProduct = productRepository.create(productDetails);

      if (platforms && Array.isArray(platforms)) {
        //(podemos crear un servicio de busqueda de plataformas por nombre)
        const platformNames = platforms.map((elem) => elem.name);
        const existingPlatforms = await platformRepository.find({
          where: { name: In(platformNames) }, //"In" es un operador de busqueda de igualdad (typeorm)
        });

        //se fija si las plataformas no existen, sino, las crea y las guarda (tambien se pujede crear su propio servicio)
        const existingPlatformNames = existingPlatforms.map(
          (elem) => elem.name
        );
        const newPlatformNames = platformNames.filter(
          (name) => !existingPlatformNames.includes(name)
        );
        const newPlatforms = newPlatformNames.map(
          (name) =>
            platformRepository.create(platforms.find((p) => p.name === name)!) //! pa que typescript no llore
        );
        await platformRepository.save(newPlatforms);

        //fusiona plataformas existentes y nuevas, y asigna las plataformas al producto
        const allPlatforms = [...existingPlatforms, ...newPlatforms];
        newProduct.platforms = allPlatforms;
      }

      //guarda TODO el producto ya listito
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
      if (!product) {
        return null;
      }

      const { platforms, ...productDetails } = productData;
      productRepository.merge(product, productDetails);
      await productRepository.save(product);

      //manejar plataformas
      if (platforms && Array.isArray(platforms)) {
        // await platformRepository.delete({ product: { id_product: id } });

        for (const platformData of platforms) {
          const platform = {
            ...platformData,
            product: product,
          };
          await this.platformService.createPlatform(platform);
        }
      }

      const updatedProduct = await productRepository.findOne({
        where: { id_product: id },
        relations: ["platforms"],
      });

      return updatedProduct!;
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
