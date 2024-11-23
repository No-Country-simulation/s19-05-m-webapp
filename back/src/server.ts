import cors from "cors";
import morgan from "morgan";
import express from "express";
import { errorHandler } from "./middlewares/errorHandler.mid";
import { pathHandler } from "./middlewares/pathHandler.mid";
import indexRouter from "./routers/index.router";

import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import { options } from "./swaggerConfig"

const server = express();

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true })); // middelware para leer los params
server.use(morgan("dev"));
// Sessions

//SwaggerDocument
const specs = swaggerJSDoc(options); 

// Rutas aqui abajo.
server.use("/api", indexRouter);
server.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// Manejo de errores.
server.use(errorHandler);
server.use(pathHandler);

export default server;