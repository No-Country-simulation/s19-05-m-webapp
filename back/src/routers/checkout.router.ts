import { Router } from "express";
import { CheckoutController } from "../controllers/checkout.controller";

const checkoutRouter = Router();
const checkoutController = new CheckoutController();

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