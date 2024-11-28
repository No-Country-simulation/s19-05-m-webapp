import { Router, Request, Response } from "express";
import { UserController } from "../controllers/users.controller";
import { isValidData } from "../middlewares/isValidData.mid";
import { isUser } from "../middlewares/isUser.mid";
import { hashPassword } from "../middlewares/hashPassword.mid";

const userRouter = Router();
const userController = new UserController();

/**
 * @swagger
 * tags:
 *   name: User
 *   description: API for managing users, including creating, updating, reading, and deleting user profiles. The API supports features such as user registration, login, and profile management.
 */

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Creates a new user.
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the user.
 *               email:
 *                 type: string
 *                 description: The email of the user.
 *               password:
 *                 type: string
 *                 description: The password for the user (hashed before storage).
 *               address:
 *                 type: string
 *                 description: The address of the user.
 *               phone:
 *                 type: string
 *                 description: The phone number of the user.
 *             required:
 *               - name
 *               - email
 *               - password
 *     responses:
 *       201:
 *         description: The user was successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request, invalid input data.
 *       409:
 *         description: Conflict, user with the provided email already exists.
 *       500:
 *         description: Internal server error.
 */
userRouter.post(
  "/",
  isValidData,
  isUser,
  hashPassword,
  userController.CreateUser
);

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Retrieves a list of all users.
 *     tags: [User]
 *     responses:
 *       200:
 *         description: A list of users with their details.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Internal server error.
 */
userRouter.get("/", userController.ReadAll);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Retrieves a user by their ID.
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The details of the user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found with the provided ID.
 *       500:
 *         description: Internal server error.
 */
userRouter.get("/:id", userController.ReadOnebyId);

/**
 * @swagger
 * /api/user/readone:
 *   post:
 *     summary: Retrieves a user by their email address.
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email address of the user to retrieve.
 *             required:
 *               - email
 *     responses:
 *       200:
 *         description: The details of the user matching the provided email.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found with the provided email.
 *       400:
 *         description: Invalid email format or missing email in the request.
 *       500:
 *         description: Internal server error.
 */
userRouter.post("/readone", userController.ReadOnebyEmail);

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Updates the details of an existing user by their ID.
 *     tags: [User]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The unique identifier of the user to update.
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the user.
 *               email:
 *                 type: string
 *                 description: The email address of the user.
 *               password:
 *                 type: string
 *                 description: The updated password for the user (hashed before storage).
 *               address:
 *                 type: string
 *                 description: The address of the user.
 *               phone:
 *                 type: string
 *                 description: The phone number of the user.
 *               role:
 *                 type: string
 *                 description: The role of the user, can be either "ADMINISTRATOR" or "USER".
 *             required:
 *               - name
 *               - email
 *               - address
 *               - phone
 *     responses:
 *       200:
 *         description: The user details were successfully updated.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request, invalid input data.
 *       404:
 *         description: User with the provided ID not found.
 *       500:
 *         description: Internal server error.
 */
userRouter.put("/:id", userController.UpdateUser);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Deletes an existing user by their ID.
 *     tags: [User]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The unique identifier of the user to delete.
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The user was successfully deleted.
 *       404:
 *         description: User with the provided ID not found.
 *       500:
 *         description: Internal server error.
 */
userRouter.delete("/:id", userController.DeleteUser);

export default userRouter;
