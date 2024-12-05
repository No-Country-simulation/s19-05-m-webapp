import { Router, Request, Response, NextFunction } from "express";
import passport from "../middlewares/passportGoogle.mid";
import { UserController } from "../controllers/users.controller";

const sessionRouter = Router();
const userController = new UserController();

/**
 * @swagger
 * tags:
 *   name: Sessions
 *   description: API for managing sessions, including register, login, online, signout sessions and Google oauth.
 */

/*
*
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

// Registrar usuarios.
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
 *                     token:
 *                       type: string
 *                       example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuZXdVc2VyIjp7Im5hbWUiOiJCZW5qYW1pbiBQZXlyYWdhIiwiZW1haWwiOiJiZW5qYXBleUBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRSMDVFV2JXeGxST0RDLlRZVVouSjJ1c3ZZMXVCRFEyUEhRbUcyN2J4dWZLUlMuRmY4UmRRQyIsImFjdGl2ZSI6dHJ1ZSwiYWRkcmVzcyI6IjQ1NiBFbG0gU3RyZWV0LCBNZXRyb3BvbGlzIiwicGhvbmUiOiIrMS01NTUtNjc4OSIsImlkX3VzZXJzIjo5LCJyb2xlIjoiVVNFUiJ9LCJpYXQiOjE3MzM0MDc2MjcsImV4cCI6MTczNDAxMjQyN30.6WoIVuqEjvu-iyqGgTdXw7KXi0T5VCjp13opH-oiMcE"
 *                     user:
 *                       type: object
 *                       properties:
 *                         name:
 *                           type: string
 *                           example: Juan Perez
 *                         email:
 *                           type: string
 *                           example: JuanPerez@gmail.com
 *                         password:
 *                           type: string
 *                           example: "$2b$10$R05EWbWxlRODC.TYUZ.J2usvY1uBDQ2PHQmG27bxufKRS.Ff8RdQC"
 *                         active:
 *                           type: boolean
 *                           example: true
 *                         address:
 *                           type: string
 *                           example: 456 Elm Street, Metropolis
 *                         phone:
 *                           type: string
 *                           example: "+1-555-6789"
 *                         id_users:
 *                           type: integer
 *                           example: 9
 *                         role:
 *                           type: string
 *                           example: USER
 *       400:
 *         description: Bad request, invalid input data.
 *       409:
 *         description: Conflict, user with the provided email already exists.
 *       500:
 *         description: Internal server error.
 */

sessionRouter.post("/register", passport.authenticate("register", { session: false }), register);

// Loguear usuarios.
/**
 * @swagger
 * /api/sessions/login:
 *   post:
 *     summary: Authenticate a user and generate a session token.
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
 *       201:
 *         description: Successfully logged in.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: USER LOGGED IN.
 *                 token:
 *                   type: string
 *                   description: The JWT token to be used for further authenticated requests.
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE2ODMwMDAwMDB9.tYMCfBPWEXMxHPZi8U5VL23_HdYAH_vWXQGpdcwUMcA"
 *                 user:
 *                   type: object
 *                   description: The user's information.
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: John Doe
 *                     email:
 *                       type: string
 *                       example: user@example.com
 *                     active:
 *                       type: boolean
 *                       example: true
 *                     address:
 *                       type: string
 *                       example: 123 Main Street, Springfield
 *                     phone:
 *                       type: string
 *                       example: "+1-555-1234"
 *                     id_users:
 *                       type: integer
 *                       example: 9
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
 */
sessionRouter.post("/login", passport.authenticate("login", { session: false }), login);

// Consultar si está online.
/**
 * @swagger
 * /api/sessions/online:
 *   post:
 *     summary: Validate a user session and set the user as online.
 *     tags: 
 *       - Sessions
 *     parameters:
 *       - in: header
 *         name: token
 *         required: true
 *         description: JWT token to authenticate the user.
 *         schema:
 *           type: string
 *           example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiVVNFUiIsInVzZXJfaWQiOjksImlhdCI6MTczMzQwOTQ4MCwiZXhwIjoxNzM0MDE0MjgwfQ.jrKcLB6-gLMswzT7XJ0YKuB1-o8T0UGr-h-Ut08clzw
 *     responses:
 *       201:
 *         description: User successfully validated and marked as online.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: El usuario: benjapey@gmail.com is online
 *                 token:
 *                   type: string
 *                   description: The same JWT token provided in the request.
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiVVNFUiIsInVzZXJfaWQiOjksImlhdCI6MTczMzQwOTQ4MCwiZXhwIjoxNzM0MDE0MjgwfQ.jrKcLB6-gLMswzT7XJ0YKuB1-o8T0UGr-h-Ut08clzw
 *       400:
 *         description: Bad request. Token is missing or invalid.
 *       401:
 *         description: Unauthorized. The token provided is invalid or expired.
 *       500:
 *         description: Internal server error.
 */
sessionRouter.post("/online", passport.authenticate("online", { session: false }), online);

// Cerrar sesión de usuarios.
sessionRouter.post("/signout", passport.authenticate("signout", { session: false }), signout);

// Autenticar con Google. A la pantalla de consentimiento.
sessionRouter.get("/auth/google", passport.authenticate("google", { scope: ["email", "profile"] }));

// Callback de Google Auth.
sessionRouter.get("/auth/google/callback", passport.authenticate("google", { session: false }), google);

// Funcion para registarr un usuario.
function register(req: Request, res: Response, next: NextFunction): void {
    try {
        const user = req.user;
        res.status(200).json({ message: "USER CREATED.", user });
    } catch (error) {
        next(error);
    }
}

// Funcion para loguear un usuario.
function login(req: Request, res: Response, next: NextFunction): void {
    try {
        const user = req.user;
        const token = req.token;
        res.status(200).json({ message: "USER LOGGED IN", token, user });
    } catch (error) {
        return next(error);
    };
}

// Funcion para ver si esta online un usario.
function online(req: Request, res: Response, next: NextFunction): void {
    try {
        const user: any = req.user || undefined;
        res.status(200).json({ message: `El usuario: ${user.email} is online`, token: req.token });
    } catch (error) {
        return next(error);
    };
}

// Funcion para signout un user.
function signout(req: Request, res: Response, next: NextFunction): void {
    try {
        const user = req.user;
        res.status(200).json({ message: "USER SIGNOUT.", user });
    } catch (error) {
        next(error);
    }
}

// Funcion de respuesta de google auth callback.
function google(req: Request, res: Response, next: NextFunction): void {
    try {
        const user = req.user;
        res.status(200).json({ message: "USER LOGGED IN", user });
    } catch (error) {
        next(error);
    }
}

export default sessionRouter;

/*
sessionsRouter.post("/register", passport.authenticate("register", { session: false }), register)
sessionsRouter.post("/login", passport.authenticate("login", { session: false }), login)
sessionsRouter.post("/signout", signout)
sessionsRouter.post("/online", onlineToken)
// /api/sessions/google va a llamar a la pantalla de consentimiento y se encarga de autenticar en google
sessionsRouter.get("/google", passport.authenticate("google", { scope: ["email", "profile"] }))
// /api/sessions/google/cb va a llamar efectivamente a la estrategia encargada de register/login con google
sessionsRouter.get("/google/cb", passport.authenticate("google", { session: false }), google)
*/
/*
function google(req: Request, res: Response, next: NextFunction): Response | void {
    try {
        // Asegúrate de que `req.token` esté definido antes de usarlo
        if (!req.token) {
            return res.status(400).json({ message: "Token not found" });
        }

        // Retorna una respuesta con el token
        return res.status(200).json({ message: "USER LOGGED IN", token: req.token });
    } catch (error) {
        // Pasa el error al middleware de manejo de errores
        return next(error);
    }
}
    */

/* Esta en JS.
async function register(req, res, next) {
    try {
        const user = req.user
        return res.status(201).json({ message: "USER REGISTERED", user_id: user._id })
    } catch (error) {
        return next(error)
    }
}
async function login(req, res, next) {
    try {
        //const user = req.user
        //return res.status(200).json({ message: "USER LOGGED IN", user_id: user._id })
        return res.status(200).json({ message: "USER LOGGED IN", token: req.token })
    } catch (error) {
        return next(error)
    }
}
function signout(req, res, next) {
    try {
        req.session.destroy()
        return res.status(200).json({ message: "USER SIGNED OUT" })
    } catch (error) {
        return next(error)
    }
}
async function online(req, res, next) {
    try {
        const { user_id } = req.session
        const one = await readById(user_id)
        if (req.session.user_id) {
            return res.status(200).json({ message: one.email.toUpperCase() + " IS ONLINE", online: true })
        } else {
            return res.status(400).json({ message: "USER IS NOT ONLINE", online: false })
        }
    } catch (error) {
        return next(error)
    }
}
function google(req, res, next) {
    try {
        //const user = req.user
        //return res.status(200).json({ message: "USER LOGGED IN", user_id: user._id })
        return res.status(200).json({ message: "USER LOGGED IN", token: req.token })
    } catch (error) {
        return next(error)
    }
}
async function onlineToken(req, res, next) {
    try {
        const { token } = req.headers
        const data = verifyTokenUtil(token)
        const one = await readById(data.user_id)
        if (one) {
            return res.status(200).json({ message: one.email.toUpperCase() + " IS ONLINE", online: true })
        } else {
            return res.status(400).json({ message: "USER IS NOT ONLINE", online: false })
        }
    } catch (error) {
        return next(error)
    }
}
*/
