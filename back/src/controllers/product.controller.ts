import { Request, Response, NextFunction } from "express";
import { ProductService } from "../services/product.service";
import { Product } from "../entity/Product.entity";
import ControllerHandler from "../handlers/controllers.handler";

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - title
 *         - price
 *         - description
 *         - type
 *         - image
 *         - genre
 *         - stock
 *       properties:
 *         id_product:
 *           type: integer
 *           description: The auto-generated ID of the product
 *         title:
 *           type: string
 *           description: The title of the product
 *           maxLength: 45
 *         price:
 *           type: number
 *           format: float
 *           description: The price of the product
 *         available:
 *           type: boolean
 *           description: Indicates if the product is available for sale
 *           default: true
 *         description:
 *           type: string
 *           description: A detailed description of the product
 *         type:
 *           type: string
 *           description: The type/category of the product
 *           maxLength: 20
 *         image:
 *           type: string
 *           description: URL or path to the product image
 *         genre:
 *           type: string
 *           description: The genre of the product (e.g., for games or media)
 *           maxLength: 20
 *         stock:
 *           type: integer
 *           description: The number of items in stock for this product
 *         platforms:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Platforms'
 *           description: A list of platforms associated with the product
 *       example:
 *         title: "Product Title"
 *         price: 99.99
 *         description: "A great product."
 *         type: "Electronics"
 *         image: "/images/product.jpg"
 *         genre: "Action"
 *         stock: 100
 */
export class ProductController {
  private readonly productService: ProductService;

  constructor() {
    this.productService = new ProductService();
    // Enlaza el contexto de los métodos
    this.getAllProductsController = this.getAllProductsController.bind(this);
    this.getProductsWithLimitController = this.getProductsWithLimitController.bind(this);
    this.getProductByIdController = this.getProductByIdController.bind(this);
    this.createProductController = this.createProductController.bind(this);
    this.updateProductController = this.updateProductController.bind(this);
    this.deleteProductController = this.deleteProductController.bind(this);
    this.getProductsByPlatformController = this.getProductsByPlatformController.bind(this);
    this.getProductsByGenreController = this.getProductsByGenreController.bind(this);
  }

  async getAllProductsController(req: Request, res: Response, next: NextFunction):Promise<any> {
    try {

      const products = await this.productService.getAllProducts();

      return ControllerHandler.ok("Products retrieved successfully", res, products);

    } catch (error) {
      next(error);
    }
  }

  async getProductsWithLimitController(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {

      const limit = parseInt(req.query.limit as string, 10);

      if (isNaN(limit) || limit <= 0)  return ControllerHandler.badRequest("Invalid limit", res);

      const products = await this.productService.getProductsWithLimit(limit);

      return ControllerHandler.ok(`Products list with a limit of ${limit}`,res, products);

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

      if (isNaN(productId) || productId <= 0) return ControllerHandler.badRequest(`Invalid product ID: ${id}`, res);

      const product = await this.productService.getProductById(productId);

      if (!product) return ControllerHandler.notFound("Product not found", res);

      return ControllerHandler.ok(`Product list with ID: ${id}`,res, product);

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

      if (!productData.title || typeof productData.title !== "string") 
        return ControllerHandler.badRequest("Title most be a string and not empty", res);

      if (productData.price === undefined || typeof productData.price !== "number" || productData.price <= 0)
        return ControllerHandler.badRequest("Price must be a positive number", res);

      const newProduct = await this.productService.createProduct(productData);

      return ControllerHandler.ok(`Product created with ID: ${newProduct.id_product}`, res, newProduct);

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

      if (!updatedProduct) return ControllerHandler.notFound("Product not found", res);

      return ControllerHandler.ok(`Product updated with ID: ${id}`, res, updatedProduct);

    } catch (error) {
      console.error("Error in updateProductController:", error);
      next(error);
    }
  }

  async deleteProductController(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {

      const { id } = req.params;
      const product = await this.productService.deleteProduct(parseInt(id));

      return ControllerHandler.ok("Deleted product.", res, product);

    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  async getProductsByPlatformController(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { platform } = req.params;

      if (!platform || typeof platform !== "string") {
        return ControllerHandler.badRequest("Invalid platform", res);
      }

      const products = await this.productService.getProductsByPlatform(platform);
      return ControllerHandler.ok(
        `Products filtered by platform: ${platform}`,
        res,
        products
      );
    } catch (error) {
      next(error);
    }
  }

  async getProductsByGenreController(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { genre } = req.params;
      console.log("Raw genre value:", genre);

      if (!genre || typeof genre !== "string") {
        console.error("Invalid genre value:", genre);
        return ControllerHandler.badRequest("Invalid genre", res);
      }

      const products = await this.productService.getProductsByGenre(genre);
      console.log("Products found:", products);
      return ControllerHandler.ok(
        `Products filtered by genre: ${genre}`,
        res,
        products
      );
    } catch (error) {
      next(error);
    }
  }
}
