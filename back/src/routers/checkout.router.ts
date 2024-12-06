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
 * /api/checkouts:
 *   get:
 *     summary: Get all checkouts
 *     tags: [Checkout]
 *     description: Retrieves a list of all checkouts.
 *     responses:
 *       200:
 *         description: A list of all checkouts.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Checkout'
 */
checkoutRouter.get("/", checkoutController.getAllCheckoutController);

/**
 * @swagger
 * /api/checkouts/{id}:
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
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Checkout'
 *       404:
 *         description: Checkout not found.
 */
checkoutRouter.get("/:id", checkoutController.getCheckoutByIdController);

/**
 * @swagger
 * /api/checkouts/status/{status}:
 *   get:
 *     summary: Get checkouts by status
 *     tags: [Checkout]
 *     description: Retrieves a list of checkouts by their status (PENDING, DECLINED, PAID).
 *     parameters:
 *       - in: path
 *         name: status
 *         required: true
 *         description: The status of the checkouts to retrieve (PENDING, DECLINED, PAID).
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of checkouts with the specified status.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Checkout'
 *       404:
 *         description: No checkouts found with the specified status.
 */
checkoutRouter.get("/status/:status", checkoutController.getCheckoutsByStatusController);

/**
 * @swagger
 * /api/checkouts/user/{userId}:
 *   get:
 *     summary: Get the checkouts for a user
 *     tags: [Checkout]
 *     description: Retrieves a list of checkouts by user.
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         description: Retrieves a list of checkouts by user.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of checkouts with the specified user.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Checkout'
 *       404:
 *         description: No checkouts found with the specified status.
 */
checkoutRouter.get("/user/:userId", checkoutController.getCheckoutsByUserController);

export default checkoutRouter;