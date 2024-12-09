import cors from "cors";
import morgan from "morgan";
import express from "express";
import { errorHandler } from "./middlewares/errorHandler.mid";
import { pathHandler } from "./middlewares/pathHandler.mid";
import indexRouter from "./routers/index.router";
import session from "express-session";
import { setupSwagger } from "./swagger/config";
import { SECRET_KEY } from "./config/env";

const server = express();

server.use(cors({
    origin: ['https://checkpoint-zone.vercel.app', 'http://localhost:5173'], // Agrega tu dominio de Vercel
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    credentials: true,
}));
server.use(express.json());
server.use(express.urlencoded({ extended: true })); // middelware para leer los params
server.use(morgan("dev"));
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