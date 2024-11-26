import cors from "cors";
import morgan from "morgan";
import express from "express";
import { errorHandler } from "./middlewares/errorHandler.mid";
import { pathHandler } from "./middlewares/pathHandler.mid";
import indexRouter from "./routers/index.router";

import { setupSwagger } from "./swagger/config"

const server = express();

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true })); // middelware para leer los params
server.use(morgan("dev"));
// Sessions

// Rutas aqui abajo.
setupSwagger(server);
server.use("/api", indexRouter);

// Manejo de errores.
server.use(errorHandler);
server.use(pathHandler);

export default server;