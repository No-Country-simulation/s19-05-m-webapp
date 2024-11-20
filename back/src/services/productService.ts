import { productRepository } from "../repositories/productRepository";

export class ProductService {

    async getProductsWithLimit(limit: number) {
        return await productRepository
          .createQueryBuilder("product")
          .take(limit) // Limita la cantidad de productos a devolver
          .getMany();
    }
}