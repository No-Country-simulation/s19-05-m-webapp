import { productRepository } from "../repositories/product.repository";

export class ProductService {

    async getProductsWithLimit(limit: number) {
        return await productRepository
          .createQueryBuilder("products")
          .take(limit) // Limita la cantidad de productos a devolver
          .getMany();
    }
}