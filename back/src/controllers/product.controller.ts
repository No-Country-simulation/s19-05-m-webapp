import { Request, Response, NextFunction } from "express";
import { ProductService } from "../services/product.service";
import { AppDataSource } from "../config/db-config";
import { Product } from "../entity/Product.entity";

export class ProductController {
    private readonly productService: ProductService;

    constructor() {
        this.productService = new ProductService();
    }

    async getProductsWithLimitController(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            // Obtiene el parámetro `limit` de la query string
            const limit = parseInt(req.query.limit as string) || 10;
        
            // Valida que el límite sea un número positivo
            if (limit <= 0) {
              return res.status(400).json({ error: "Limit must be a positive number" });
            }
        
            // Llama al servicio para obtener los productos
            const products = await this.productService;
        
            // Responde con los productos obtenidos
            return res.json(products);
          } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
          }
    }
}
