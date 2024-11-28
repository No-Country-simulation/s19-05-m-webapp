import { Router } from "express";
import { CheckoutController } from "../controllers/checkout.controller";

const checkoutRouter = Router();
const checkoutController = new CheckoutController();

/**
 * @swagger
 * tags:
 *   name: Checkout
 *   description: API for displaying informational records related to shopping carts, products, and user transactions. Allows users to view cart status, product details, and transaction information, without modifying cart contents or completing checkout.
 */

/**
 * @swagger
 * /api/checkouts:
 *   get:
 *     summary: Retrieves all checkout records (informational).
 *     tags: [Checkout]
 *     description: This endpoint retrieves records related to shopping carts, products, and user transactions. It allows users to view cart status, product details, and transaction information, without modifying cart contents or completing checkout.
 *     responses:
 *       200:
 *         description: A list of informational checkout records.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Checkout'
 *       500:
 *         description: Internal server error.
 */
checkoutRouter.get("", checkoutController.getAllCheckoutController);

/**
 * @swagger
 * /api/checkouts/{id}:
 *   get:
 *     summary: Retrieves a checkout record by ID.
 *     tags: [Checkout]
 *     description: This endpoint retrieves a specific checkout record by its unique ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the checkout record.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A checkout record by the provided ID.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Checkout'
 *       404:
 *         description: Checkout record not found.
 *       500:
 *         description: Internal server error.
 */
checkoutRouter.get("/:id", checkoutController.getCheckoutByIdController);

/**
 * @swagger
 * /api/checkouts/{product}:
 *   get:
 *     summary: Retrieves checkout records by product.
 *     tags: [Checkout]
 *     description: This endpoint retrieves all checkout records that include a specific product.
 *     parameters:
 *       - name: product
 *         in: path
 *         required: true
 *         description: The product ID to filter by.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A list of checkout records for the provided product.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Checkout'
 *       404:
 *         description: No checkout records found for the product.
 *       500:
 *         description: Internal server error.
 */
checkoutRouter.get("/:product", checkoutController.getCheckoutByProductController);

/**
 * @swagger
 * /api/checkouts/{user}:
 *   get:
 *     summary: Retrieves checkout records by user.
 *     tags: [Checkout]
 *     description: This endpoint retrieves all checkout records associated with a specific user.
 *     parameters:
 *       - name: user
 *         in: path
 *         required: true
 *         description: The user ID to filter by.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A list of checkout records for the provided user.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Checkout'
 *       404:
 *         description: No checkout records found for the user.
 *       500:
 *         description: Internal server error.
 */
checkoutRouter.get("/:user", checkoutController.getCheckoutByUserController);

/**
 * @swagger
 * /api/checkouts/{status}:
 *   get:
 *     summary: Retrieves checkout records by status.
 *     tags: [Checkout]
 *     description: This endpoint retrieves all checkout records with a specific status.
 *     parameters:
 *       - name: status
 *         in: path
 *         required: true
 *         description: The status of the checkout record (e.g., completed, pending).
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of checkout records with the provided status.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Checkout'
 *       404:
 *         description: No checkout records found with the specified status.
 *       500:
 *         description: Internal server error.
 */
checkoutRouter.get("/:status", checkoutController.getCheckoutsWithStatusController);

export default checkoutRouter;