import { Request, Response, NextFunction } from "express";
import { ProductService } from "../services/product.service";
import { error } from "console";

export class ProductController {
    private productService: ProductService;

    constructor() {
        this.productService = new ProductService(); // Instanciamos el servicio aquí.
        
        // Enlazamos los métodos del controlador
        this.getProductsController = this.getProductsController.bind(this);
        this.getProductByIdController = this.getProductByIdController.bind(this);
    }

    async getProductsController(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            // Obtener los parámetros de la query: genre, platform y limit
            const { genre, platform, limit } = req.query;

            let limitParam: number | undefined;

            if (limit) {
                const parsedLimit = parseInt(limit as string, 10);
                if (isNaN(parsedLimit) || parsedLimit <= 0) {
                    res.status(400).json({
                        error: "The 'limit' query parameter must be a positive number.",
                    });
                }
                limitParam = parsedLimit;
            }

            // Llamar al servicio con los filtros de género y plataforma
            const products = await this.productService.getProducts(
                limitParam,
                genre as string | undefined, // Puede ser undefined si no se pasa
                platform as string | undefined // Puede ser undefined si no se pasa
            );

            res.status(200).json(products);
        } catch (error) {
            console.error("Error in getProductsController:", (error as Error).message);
            next(error);
        }
    }

    async getProductByIdController(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const { id } = req.params;

            const productId = parseInt(id, 10);
            if (isNaN(productId) || productId <= 0) {
                return res.status(400).json({ error: "Invalid product ID" });
            }

            const product = await this.productService.getProductById(productId);

            if (!product) {
                return res.status(404).json({ error: "Product not found" });
            }

            return res.json(product);
        } catch (error) {
            next(error);
        }
    }
}


