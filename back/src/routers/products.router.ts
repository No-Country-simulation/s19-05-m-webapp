import { Router } from "express";
import { ProductController } from "../controllers/product.controller";

const productRouter = Router();
const productController = new ProductController();
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
 *         id_product: 1
 *         title: "Product Title"
 *         price: 99.99
 *         available: true
 *         description: "A great product."
 *         type: "Electronics"
 *         image: "/images/product.jpg"
 *         genre: "Action"
 *         stock: 100
 *         platforms:
 *           - platform_id: 1
 *             platform_name: "PlayStation"
 *           - platform_id: 2
 *             platform_name: "Xbox"
 */

/**
 * @swagger
 * tags:
 *   name: Product
 *   description: API for managing products, including creating, reading, updating, and deleting product details. The API supports product management in an e-commerce platform.
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Returns a list of all products.
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: The list of products.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: Internal server error.
 */
productRouter.get("", productController.getAllProductsController);

/**
 * @swagger
 * /api/products/limited?limit={number}:
 *   get:
 *     summary: Returns a limited list of products.
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: A limited list of products.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: Internal server error.
 */
productRouter.get("/limited", productController.getProductsWithLimitController);

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Creates a new product.
 *     tags: [Product]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: The product was successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad request, invalid input data.
 *       500:
 *         description: Internal server error.
 */
productRouter.post("", productController.createProductController);

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Updates an existing product by ID.
 *     tags: [Product]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the product to update.
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: The product was successfully updated.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad request, invalid input data.
 *       404:
 *         description: Product not found.
 *       500:
 */
productRouter.put("/:id", productController.updateProductController);

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Deletes an existing product by ID.
 *     tags: [Product]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the product to delete.
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The product was successfully deleted.
 *       400:
 *         description: Bad request, invalid input data.
 *       404:
 *         description: Product not found.
 *       500:
 *         description: Internal server error.
 */
productRouter.delete("/:id", productController.deleteProductController);

/**
 * @swagger
 * /api/products/platform/{platform}:
 *   get:
 *     summary: Returns a list of products available on a specific platform.
 *     tags: [Product]
 *     parameters:
 *       - name: platform
 *         in: path
 *         description: The platform to filter products by (e.g., PlayStation, Xbox).
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of products available on the specified platform.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad request, invalid platform name.
 *       404:
 *         description: No products found for the given platform.
 *       500:
 *         description: Internal server error.
 */
productRouter.get("/platform/:platform", productController.getProductsByPlatformController);

/**
 * @swagger
 * /api/product/genre/{genre}:
 *   get:
 *     summary: Returns a list of products that belong to a specific genre.
 *     tags: [Product]
 *     parameters:
 *       - name: genre
 *         in: path
 *         description: The genre to filter products by (e.g., Action, Adventure).
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of products that belong to the specified genre.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad request, invalid genre name.
 *       404:
 *         description: No products found for the given genre.
 *       500:
 *         description: Internal server error.
 */
productRouter.get("/genre/:genre", productController.getProductsByGenreController);


export default productRouter;
