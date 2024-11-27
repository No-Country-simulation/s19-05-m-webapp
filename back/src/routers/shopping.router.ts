import { Router } from "express";
import { ShoppingController } from "../controllers/shopping.controller";

const shoppingRouter = Router();
const shoppingController = new ShoppingController();
/**
 * @swagger
 * components:
 *   schemas:
 *     Shopping:
 *       type: object
 *       required:
 *         - user_id
 *         - products_id
 *         - state
 *         - quantity
 *       properties:
 *         user_id:
 *           type: integer
 *           description: The ID of the user associated with the shopping
 *         products_id:
 *           type: integer
 *           description: The ID of the product in the shopping cart
 *         state:
 *           type: string
 *           description: The state of the shopping, can be "PENDING", "COMPLETED", or "CANCELLED"
 *           enum:
 *             - "PENDING"
 *             - "COMPLETED"
 *             - "CANCELLED"
 *           default: "PENDING"
 *         quantity:
 *           type: integer
 *           description: The quantity of the product in the shopping cart
 *         users:
 *           $ref: '#/components/schemas/User'  # Referencia al esquema de la entidad User
 *         products:
 *           $ref: '#/components/schemas/Product'  # Referencia al esquema de la entidad Product
 *         checkout:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Checkout'  # Referencia al esquema de la entidad Checkout
 *       example:
 *         user_id: 1
 *         products_id: 101
 *         state: "PENDING"
 *         quantity: 2
 */

/**
 * @swagger
 * tags:
 *   name: Shopping
 *   description: API for managing shopping carts, products, and user transactions. Allows users to add products, update quantities, view cart status, and complete checkout.
 */

/**
 * @swagger
 * /api/shopping:
 *   get:
 *     summary: Returns a list of all shopping carts and their details.
 *     tags: [Shopping]
 *     responses:
 *       200:
 *         description: A list of all shopping carts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Shopping'
 */
shoppingRouter.get("", shoppingController.getAllShoppingController);

/**
 * @swagger
 * /api/shopping:
 *   post:
 *     summary: Creates a new shopping cart for a user.
 *     tags: [Shopping]
 *     responses:
 *       201:
 *         description: The shopping cart has been successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Shopping'
 */
shoppingRouter.post("", shoppingController.createShoppingController);

/**
 * @swagger
 * /api/shopping/{user}/{product}:
 *   put:
 *     summary: Updates the shopping cart for a specific user and product.
 *     tags: [Shopping]
 *     parameters:
 *       - in: path
 *         name: user
 *         required: true
 *         description: The ID of the user whose cart is being updated.
 *         schema:
 *           type: integer
 *       - in: path
 *         name: product
 *         required: true
 *         description: The ID of the product being updated in the shopping cart.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The shopping cart was successfully updated.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Shopping'
 *       400:
 *         description: Invalid input or bad request.
 *       404:
 *         description: Shopping cart or product not found.
 */
shoppingRouter.put("/:user/:product", shoppingController.updateShoppingController);

/**
 * @swagger
 * /api/shopping/{user}:
 *   patch:
 *     summary: Updates the payment status of a user's shopping cart.
 *     tags: [Shopping]
 *     parameters:
 *       - in: path
 *         name: user
 *         required: true
 *         description: The ID of the user whose payment status is being updated.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The payment status of the shopping cart was successfully updated.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Shopping'
 *       400:
 *         description: Invalid input or bad request.
 *       404:
 *         description: Shopping cart not found for the user.
 *       500:
 *         description: Internal server error.
 */
shoppingRouter.patch("/:user", shoppingController.paymentPurchasesController);

export default shoppingRouter;