import { Request, Response, NextFunction } from "express";
import { ProductService } from "../services/product.service";
import { Product } from "../entity/Product.entity";

export class ProductController {
  private readonly productService: ProductService;

  constructor() {
    this.productService = new ProductService();

    // Enlaza el contexto de los métodos
    this.getProductsWithLimitController =
      this.getProductsWithLimitController.bind(this);
    this.getProductByIdController = this.getProductByIdController.bind(this);

    this.createProductController = this.createProductController.bind(this);
    this.updateProductController = this.updateProductController.bind(this);
  }

  async getProductsWithLimitController(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const limit = parseInt(req.query.limit as string, 10);

      if (isNaN(limit) || limit <= 0) {
        return res
          .status(400)
          .json({ error: "Limit must be a positive number" });
      }

      const products = await this.productService.getProductsWithLimit(limit);
      return res.json(products);
    } catch (error) {
      next(error);
    }
  }

  async getProductByIdController(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
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

  async createProductController(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const productData: Partial<Product> = req.body; //el partial es para que no tenga que tener todos los campos

      if (!productData.title || typeof productData.title !== "string") {
        return res.status(400).json({
          error: "Title most be a string and not empty",
        });
      }

      if (
        productData.price === undefined ||
        typeof productData.price !== "number" ||
        productData.price <= 0
      ) {
        return res.status(400).json({
          error: "Price most be a number and greater than 0",
        });
      }

      const newProduct = await this.productService.createProduct(productData);
      return res.status(201).json(newProduct);
    } catch (error) {
      console.error("Error in createProductController:", error);
      next(error);
    }
  }

  async updateProductController(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { id } = req.params;
      const productData: Partial<Product> = req.body;

      const updatedProduct = await this.productService.updateProduct(
        parseInt(id, 10),
        productData
      );

      if (!updatedProduct) {
        return res.status(404).json({ error: "Product not found" });
      }

      return res.json(updatedProduct);
    } catch (error) {
      console.error("Error in updateProductController:", error);
      next(error);
    }
  }
}
