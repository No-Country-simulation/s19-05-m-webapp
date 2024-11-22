import { Router } from "express";
import { ProductController } from "../controllers/product.controller";

const productRouter = Router();
const productController = new ProductController();

/**
 * @openapi
 * /api/products:
 *     get:
 *         description: Get all products
 */
productRouter.get("", productController.getAllProductsController);
/**
 * @openapi
 * /api/products?limit={number}:
 *     get:
 *         description: Get all products
 */
productRouter.get("/limited", productController.getProductsWithLimitController);
/**
 * @openapi
 * /api/products/{id}:
 *     get:
 *         description: Get product by id
 */
productRouter.get("/:id", productController.getProductByIdController);
/**
 * @openapi
 * /products:
 *   post:
 *     summary: Crea un nuevo producto
 *     tags:
 *       - Productos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductInput'
 *     responses:
 *       201:
 *         description: Producto creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Error en la solicitud
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Error interno del servidor
 */
productRouter.post(
  "",
  productController.createProductController
);
/**
 * @openapi
 * /tasks:
 *     get:
 *         description: Tests
 */
productRouter.put(
  "/:id",
  productController.updateProductController
);
/**
 * @openapi
 * /tasks:
 *     get:
 *         description: Tests
 */
productRouter.delete("/:id", productController.deleteProductController);

export default productRouter;
