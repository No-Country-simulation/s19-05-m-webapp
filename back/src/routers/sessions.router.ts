import { Router, Request, Response, NextFunction } from "express";
import passport from "../middlewares/passportGoogle.mid";
import { UserController } from "../controllers/users.controller";

const sessionRouter = Router();
const userController = new UserController();

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
 * components:
 *   schemas:
 *     Session:
 *       type: object
 *       required:
 *         - status
 *         - user_id
 *         - login_time
 *       properties:
 *         id_session:
 *           type: integer
 *           description: The unique identifier for the session entry
 *         status:
 *           type: string
 *           description: The status of the session, can be either "ACTIVE" or "INACTIVE"
 *           enum:
 *             - "ACTIVE"
 *             - "INACTIVE"
 *         login_time:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the session was created or the user logged in
 *           default: CURRENT_TIMESTAMP
 *         user_id:
 *           type: integer
 *           description: The user ID associated with this session
 *         token:
 *           type: string
 *           description: The JWT token associated with the session
 *         user:
 *           $ref: '#/components/schemas/User'  # Reference to the User schema
 *       example:
 *         id_session: 1
 *         status: "ACTIVE"
 *         login_time: "2024-12-10T10:30:00Z"
 *         user_id: 1
 *         token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE2ODMwMDAwMDB9.tYMCfBPWEXMxHPZi8U5VL23_HdYAH_vWXQGpdcwUMcA"
 *         user:
 *           id_users: 1
 *           name: "John Doe"
 *           email: "johndoe@example.com"
 *           active: true
 *           role: "USER"
 *       additionalProperties: false
 */


/**
 * @swagger
 * /api/sessions/register:
 *   post:
 *     summary: Register a new user.
 *     tags: [Sessions]
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
 *         description: USER CREATED.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: USER CREATED.
 *                 user:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: Benjamin Peyraga
 *                     email:
 *                       type: string
 *                       example: bn@gmail.com
 *                     password:
 *                       type: string
 *                       example: "$2b$10$J0WeRNrzEM8DNC1I8Z53O.ySRdkQKLcllsexlyszOriGSm6F4bO9m"
 *                     active:
 *                       type: boolean
 *                       example: true
 *                     address:
 *                       type: string
 *                       example: 456 Elm Street, Metropolis
 *                     phone:
 *                       type: string
 *                       example: "+1-555-6789"
 *                     id_users:
 *                       type: integer
 *                       example: 33
 *                     role:
 *                       type: string
 *                       example: USER
 *       400:
 *         description: Bad request, invalid input data.
 *       409:
 *         description: Conflict, user with the provided email already exists.
 *       500:
 *         description: Internal server error.
 */
// Registrar usuarios.
sessionRouter.post("/register", passport.authenticate("register", { session: false }), register);
/**
 * @swagger
 * /api/sessions/login:
 *   post:
 *     summary: Authenticate a user and generate a session token in a cookie.
 *     tags: 
 *       - Sessions
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email of the user.
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 description: The user's password. This will be hashed before being compared with the stored hash.
 *                 example: user_password_123
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Successfully logged in. A session token is set as a "token" cookie.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: USER LOGGED IN.
 *                 user:
 *                   type: object
 *                   description: The user's information.
 *                   properties:
 *                     id_users:
 *                       type: integer
 *                       example: 9
 *                     name:
 *                       type: string
 *                       example: Juan Perez
 *                     email:
 *                       type: string
 *                       example: JuanPerez@gmail.com
 *                     active:
 *                       type: boolean
 *                       example: true
 *                     address:
 *                       type: string
 *                       example: 456 Elm Street, Metropolis
 *                     phone:
 *                       type: string
 *                       example: "+1-555-6789"
 *                     role:
 *                       type: string
 *                       example: USER
 *       400:
 *         description: Bad request. The input data is invalid or incomplete.
 *       401:
 *         description: Unauthorized. Invalid email or password.
 *       409:
 *         description: Conflict. A user with the provided email already exists.
 *       500:
 *         description: Internal server error.
 *     cookies:
 *       token:
 *         type: string
 *         description: A session cookie that stores the JWT token for further authenticated requests.
 *         example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE2ODMwMDAwMDB9.tYMCfBPWEXMxHPZi8U5VL23_HdYAH_vWXQGpdcwUMcA"
 */
// Loguear usuarios.
sessionRouter.post("/login", passport.authenticate("login", { session: false }), login);
/**
 * @swagger
 * /api/sessions/online:
 *   post:
 *     summary: Check if the user is online based on the JWT token in the cookie.
 *     tags: 
 *       - Sessions
 *     responses:
 *       200:
 *         description: Successfully checked if the user is online.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 online:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "BENJAPEY@GMAIL.COM IS ONLINE"
 *       401:
 *         description: Unauthorized. The user is not authenticated or the token is expired.
 *         
 *       500:
 *         description: Internal server error.
 *         
 *     security:
 *       - cookieAuth: []
 */
// Consultar si está online.
sessionRouter.post("/online", passport.authenticate("online", { session: false }), online);
/**
 * @swagger
 * /api/sessions/signout:
 *   post:
 *     summary: Logout the user and remove the session token in the cookie.
 *     tags: 
 *       - Sessions
 *     responses:
 *       200:
 *         description: Successfully signed out. The session token is removed from cookies.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "USER SIGNOUT."
 *       401:
 *         description: Unauthorized. The user is not authenticated or the token is invalid/expired.
 * 
 *       500:
 *         description: Internal server error.
 *         
 *     security:
 *       - cookieAuth: []
 *     cookies:
 *       token:
 *         type: string
 *         description: The token cookie will be cleared on successful signout.
 */
// Cerrar sesión de usuarios.
sessionRouter.post("/signout", passport.authenticate("signout", { session: false }), signout);
/**
 * @swagger
 * /api/sessions/auth/google:
 *   get:
 *     summary: Authenticate a user using Google and redirect to the consent screen.
 *     tags:
 *       - Sessions
 *     description: This endpoint redirects the user to Google’s consent screen for authentication. It does not accept a request body.
 *     responses:
 *       302:
 *         description: Redirects the user to the Google consent screen for authentication.
 *         headers:
 *           Location:
 *             description: The URL of the Google consent screen for authentication.
 *             type: string
 *             example: "https://accounts.google.com/o/oauth2/v2/auth?...parameters..."
 *       400:
 *         description: Bad request. The request could not be processed due to invalid parameters or configuration.
 *       500:
 *         description: Internal server error.
 *     security: []
 */
// Autenticar con Google. A la pantalla de consentimiento.
sessionRouter.get("/auth/google", passport.authenticate("google", { scope: ["email", "profile"] }));

// Callback de Google Auth.
sessionRouter.get("/auth/google/callback", passport.authenticate("google", { session: false }), google);

// Funcion para registarr un usuario.
function register(req: Request, res: Response, next: NextFunction): void {
    try {
        const user = req.user;
        const message = "USER CREATED.";
        res.status(201).json({ message, user });
    } catch (error) {
        next(error);
    }
}

// Funcion para loguear un usuario.
function login(req: Request, res: Response, next: NextFunction): void {
    try {
        const user = req.user;
        const token = req.token;
        const opts = { maxAge: 60 * 60 * 24 * 7, httpOnly: true };
        const message = "USER LOGGED IN.";
        res.status(200).cookie("token", token, opts).json({ message, user });
    } catch (error) {
        return next(error);
    };
}

// Funcion para ver si esta online un usario.
function online(req: Request, res: Response, next: NextFunction): void {
    try {
        const message = req.user
            ? `${(req.user as { email: string }).email.toUpperCase()} IS ONLINE`
            : undefined;
        res.status(200).json({ online: true, message });
    } catch (error) {
        return next(error);
    };
}

// Funcion para signout un user.
function signout(req: Request, res: Response, next: NextFunction): void {
    try {
        req.user = {};
        const message = "USER SIGNOUT.";
        res.status(200).clearCookie("token").json({ message });
    } catch (error) {
        next(error);
    }
}

// Funcion de respuesta de google auth callback.
function google(req: Request, res: Response, next: NextFunction): void {
    try {
        // Extraemos el token del objt req.token.
        const token = req.token;
        // Opciones para la cookie que almacenara el token. Duracion 7 dias y con seguridad httpOnly.
        const opts = { maxAge: 60 * 60 * 24 * 7, httpOnly: true };
        const message = "USER LOGGED IN"
        res.status(201).cookie("token", token, opts).redirect("/");
    } catch (error) {
        next(error);
    }
}

export default sessionRouter;