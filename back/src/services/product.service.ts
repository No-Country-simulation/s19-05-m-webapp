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

    async getProductById(id: number) {
        try {
            return await productRepository.findOne({
                where: { idProduct: id }, // Usa `idProduct` en lugar de `id`
                relations: ["platforms"], // Incluye las plataformas relacionadas
            });
        } catch (error) {
            console.error("Error in ProductService (getProductById):", error);
            throw new Error("Failed to fetch product by ID");
        }
    }
}
