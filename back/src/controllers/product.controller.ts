import { Request, Response, NextFunction } from "express";
import { ProductService } from "../services/product.service";

export class ProductController {
    private readonly productService: ProductService;

    constructor() {
        this.productService = new ProductService();
        // Enlaza el contexto de los métodos
        this.getProductsWithLimitController = this.getProductsWithLimitController.bind(this);
    }

    async getProductsWithLimitController(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const limit = parseInt(req.query.limit as string, 10);

            if (isNaN(limit) || limit <= 0) {
                return res.status(400).json({ error: "Limit must be a positive number" });
            }

            const products = await this.productService.getProductsWithLimit(limit);
            return res.json(products);
        } catch (error) {
            next(error);
        }
    }
}

