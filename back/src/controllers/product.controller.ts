import { Request, Response, NextFunction } from "express";
import { ProductService } from "../services/product.service";
<<<<<<< HEAD
import { error } from "console";

export class ProductController {
    private productService: ProductService;

    constructor() {
        this.productService = new ProductService(); // Instanciamos el servicio aquí.
        
        // Enlazamos los métodos del controlador
        this.getProductsController = this.getProductsController.bind(this);
        this.getProductByIdController = this.getProductByIdController.bind(this);
=======
import { Product } from "../entity/Product.entity";
import ControllerHandler from "../handlers/controllers.handler";

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
  }

  async getAllProductsController(req: Request, res: Response, next: NextFunction):Promise<any> {
    try {

      const products = await this.productService.getAllProducts();

      return ControllerHandler.ok("Products retrieved successfully", res, products);

    } catch (error) {
      next(error);
>>>>>>> 0e976e738cc0ec1774053054192a4342fe22b6e2
    }
  }

<<<<<<< HEAD
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
=======
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
>>>>>>> 0e976e738cc0ec1774053054192a4342fe22b6e2
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
}
<<<<<<< HEAD


=======
>>>>>>> 0e976e738cc0ec1774053054192a4342fe22b6e2
