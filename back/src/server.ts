import cors from "cors";
import morgan from "morgan";
import express from "express";
import { errorHandler } from "./middlewares/errorHandler.mid";
import { pathHandler } from "./middlewares/pathHandler.mid";
import indexRouter from "./routers/index.router";
import session from "express-session";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import { options } from "./swaggerConfig";
import { SECRET_KEY } from "./config/env";

const server = express();

server.use(cors());
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


//SwaggerDocument
const specs = swaggerJSDoc(options);

// Rutas aqui abajo.
server.use("/api", indexRouter);
server.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// Manejo de errores.
server.use(errorHandler);
server.use(pathHandler);

export default server;