import { errorHandler } from "../middlewares/errorHandler.mid";
import { productRepository } from "../repositories/product.repository";

export class ProductService {
    async getProducts(limit?: number, genre?: string, platform?: string) {
        try {
            const queryBuilder = productRepository.createQueryBuilder("product");

            // Unir con la tabla 'Platforms'
            queryBuilder.leftJoinAndSelect("product.platforms", "platform");

            // Filtros por género
            if (genre) {
                queryBuilder.andWhere("product.genre = :genre", { genre });
            }

            // Filtros por plataforma
            if (platform) {
                queryBuilder.andWhere("platform.name = :platform", { platform });
            }

            // Limitar los resultados si es necesario
            if (limit) {
                queryBuilder.take(limit);
            }

            // Ejecutar la consulta y obtener los productos
            const products = await queryBuilder.getMany();

            return products;
        } catch (error) {
            console.error("Error fetching products:", error);
            throw new Error("Failed to fetch products.");
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

// Agregar logica para filtrado por genero y plataforma.
    

