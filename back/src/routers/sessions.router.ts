import { Router, Request, Response, NextFunction } from "express";
import passport from "../middlewares/passportGoogle.mid";
import { UserController } from "../controllers/users.controller";
import { verifyTokenUtil } from "../utils/token.util";
import { UserService } from "../services/users.service";

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

// Registrar usuarios.
sessionRouter.post("/register", passport.authenticate("register", { session: false }), register);

// Loguear usuarios.
sessionRouter.post("/login", passport.authenticate("login", { session: false }), login);

// Consultar si está online.
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
        const user = req.user ;
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
