import { Router, Request, Response, NextFunction } from "express";
import passport from "../middlewares/passportGoogle.mid";
import { UserController } from "../controllers/users.controller";
import { verifyTokenUtil } from "../utils/token.util";
import { UserService } from "../services/users.service";

const sessionRouter = Router();



const userController = new UserController();

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
