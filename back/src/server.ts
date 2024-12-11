import cors from "cors";
import morgan from "morgan";
import express, { Request, Response, NextFunction } from "express";
import { errorHandler } from "./middlewares/errorHandler.mid";
import { pathHandler } from "./middlewares/pathHandler.mid";
import indexRouter from "./routers/index.router";
import session from "express-session";
import { setupSwagger } from "./swagger/config";
import { SECRET_KEY } from "./config/env";
import cookieParser from "cookie-parser";

const server = express();

server.use(cors({
    origin: true,// ['https://checkpoint-zone.vercel.app', 'http://localhost:5173'], // Dominios permitidos
    //methods: ['GET', 'POST', 'PATCH', 'DELETE'], // Métodos permitidos
    credentials: true, // Permitir credenciales como cookies
}));
//Cross-Origin-*
server.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
    next();
});
server.use(express.json());
server.use(express.urlencoded({ extended: true })); // middelware para leer los params
server.use(morgan("dev"));
server.use(cookieParser());
// Sessions
server.use(
    session({
        secret: SECRET_KEY,
        resave: true,
        saveUninitialized: true
    })
);


// Rutas aqui abajo.
setupSwagger(server);
server.use("/api", indexRouter);

// Manejo de errores.
server.use(errorHandler);
server.use(pathHandler);

export default server;