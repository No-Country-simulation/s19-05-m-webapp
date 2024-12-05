import { Router } from "express";
import { CheckoutController } from "../controllers/checkout.controller";

const checkoutRouter = Router();
const checkoutController = new CheckoutController();

/**
 * @swagger
 * components:
 *   schemas:
 *     Checkout:
 *       type: object
 *       required:
 *         - status
 *         - date_checkout
 *         - shopping_user
 *         - shopping_products
 *       properties:
 *         id_checkout:
 *           type: integer
 *           description: The unique identifier for the checkout entry
 *         status:
 *           type: string
 *           description: The status of the checkout, can be either "PAID" or "DECLINED"
 *           enum:
 *             - "PAID"
 *             - "DECLINED"
 *         date_checkout:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the checkout was made
 *           default: CURRENT_TIMESTAMP
 *         shopping_user:
 *           type: integer
 *           description: The user ID associated with this checkout
 *         shopping_products:
 *           type: integer
 *           description: The product ID associated with this checkout
 *         shopping:
 *           $ref: '#/components/schemas/Shopping'  # Reference to the Shopping schema
 *       example:
 *         id_checkout: 1
 *         status: "PAID"
 *         date_checkout: "2024-11-26T12:00:00Z"
 *         shopping_user: 1
 *         shopping_products: 101
 *         shopping:
 *           - user_id: 1
 *             products_id: 101
 *             state: "PENDING"
 *             quantity: 2
 *             users:
 *               id_users: 1
 *               name: "John Doe"
 *               email: "johndoe@example.com"
 *               active: true
 *               role: "USER"
 *             products:
 *               id_product: 101
 *               title: "Laptop"
 *               price: 1200.50
 *               available: true
 *               description: "High-end gaming laptop"
 *               type: "Electronics"
 *               image: "laptop.jpg"
 *               genre: "Technology"
 *               stock: 50
 */

/**
 * @swagger
 * tags:
 *   name: Checkout
 *   description: API for managing the checkout process, including handling transactions for cart purchases and interacting with the service to complete orders.
*/

/**
 * @swagger
 * /checkouts/order:
 *   post:
 *     summary: Create a new order
 *     tags: [Checkout]
 *     description: Creates a new order in the checkout process.
 *     responses:
 *       201:
 *         description: Order successfully created.
 *       400:
 *         description: Invalid input data.
 */
checkoutRouter.post("/order", checkoutController.createOrderController);

/**
 * @swagger
 * /checkouts/capture:
 *   get:
 *     summary: Capture an order
 *     tags: [Checkout]
 *     description: Captures a payment for an order.
 *     responses:
 *       200:
 *         description: Order captured successfully.
 *       404:
 *         description: Order not found.
 */
checkoutRouter.get("/capture", checkoutController.captureOrderController);

/**
 * @swagger
 * /checkouts/cancel:
 *   get:
 *     summary: Cancel an order
 *     tags: [Checkout]
 *     description: Cancels an existing order.
 *     responses:
 *       200:
 *         description: Order canceled successfully.
 *       404:
 *         description: Order not found.
 */
checkoutRouter.get("/cancel", checkoutController.cancelOrderController);

/**
 * @swagger
 * /checkout:
 *   get:
 *     summary: Get all checkouts
 *     description: Retrieves a list of all checkouts.
 *     responses:
 *       200:
 *         description: A list of all checkouts.
 */
checkoutRouter.get("/", checkoutController.getAllCheckoutController);
/**
 * @swagger
 * /checkout/{id}:
 *   get:
 *     summary: Get a checkout by ID
 *     tags: [Checkout]
 *     description: Retrieves a specific checkout by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the checkout to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Checkout found.
 *       404:
 *         description: Checkout not found.
 */
checkoutRouter.get("/:id", checkoutController.getCheckoutByIdController);
checkoutRouter.get("/status/:status", checkoutController.getCheckoutByIdController);

export default checkoutRouter;