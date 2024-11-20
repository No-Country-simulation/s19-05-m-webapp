import { productRepository } from "../repositories/product.repository";

export class ProductService {
    async getProductsWithLimit(limit: number) {
        try {
            return await productRepository
                .createQueryBuilder("products")
                .take(limit) // Limita la cantidad de productos a devolver
                .getMany();
        } catch (error) {
            console.error("Error fetching products:", error);
            throw new Error("Failed to fetch products"); // El error será capturado en el controlador
        }
    }
}
