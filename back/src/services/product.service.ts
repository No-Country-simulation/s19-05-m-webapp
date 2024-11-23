import { productRepository } from "../repositories/product.repository";
import { Product } from "../entity/Product.entity";

export class ProductService {

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
      const newProduct = productRepository.create(productData);
      return await productRepository.save(newProduct);
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
      });

      if (!product) {
        return null;
      }

      productRepository.merge(product, productData); //merge es para combinar o actualizar (de typeorm)
      return await productRepository.save(product);
    } catch (error) {
      console.error("Error updating product (updateProduct):", error);
      throw new Error("Failed to update product");
    }
  }

  async deleteProduct(id: number) {
    try {
      const product = await productRepository.findOne({where: {id_product: id}});
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

    

