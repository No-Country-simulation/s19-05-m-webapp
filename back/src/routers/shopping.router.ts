import { Router } from "express";
import { ShoppingController } from "../controllers/shopping.controller";

const shoppingRouter = Router();
const shoppingController = new ShoppingController();

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
shoppingRouter.get(
  "",
  /* authJWTMiddleware, adminMiddleware, */ shoppingController.getAllShoppingController
);

/**
 * @swagger
 * /api/shopping:
 *   post:
 *     summary: Creates a new shopping cart for a user.
 *     tags: [Shopping]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: integer
 *                 description: The ID of the user creating the shopping cart.
 *               products_id:
 *                 type: integer
 *                 description: The ID of the product being added to the cart.
 *               quantity:
 *                 type: integer
 *                 description: The quantity of the product being added to the cart.
 *             required:
 *               - user_id
 *               - products_id
 *               - quantity
 *     responses:
 *       201:
 *         description: The shopping cart has been successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Shopping'
 *       400:
 *         description: Bad request due to invalid data in the request body.
 *       500:
 *         description: Internal server error.
 */
shoppingRouter.post(
  "",
  /* authJWTMiddleware, */ shoppingController.createShoppingController
);

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
shoppingRouter.put(
  "/:user/:product" /* authJWTMiddleware, */,
  shoppingController.updateShoppingController
);

/**
 * @swagger
 * /api/shopping/{user}:
 *   post:
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
shoppingRouter.post(
  "/:user",
  /* authJWTMiddleware, */ shoppingController.paymentPurchasesController
);

/**
 * @swagger
 * /api/shopping/{user}/{product}:
 *   delete:
 *     summary: Removes a specific product from a user's shopping cart.
 *     tags: [Shopping]
 *     parameters:
 *       - in: path
 *         name: user
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the user whose shopping cart is being modified.
 *       - in: path
 *         name: product
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the product to be removed from the shopping cart.
 *     responses:
 *       200:
 *         description: The product was successfully removed from the shopping cart.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Product removed from shopping cart successfully."
 *       404:
 *         description: The specified product or user was not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "User or product not found."
 *       500:
 *         description: Internal server error.
 */
shoppingRouter.delete(
  "/:user/:product" /* authJWTMiddleware, */,
  shoppingController.deleteShoppingController
);

export default shoppingRouter;
