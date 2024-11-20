import cors from "cors";
import morgan from "morgan";
import express from "express";
import { errorHandler } from "./middlewares/errorHandler.mid";
import { pathHandler } from "./middlewares/pathHandler.mid";

const server = express();

server.use(cors());
server.use(express.json());
server.use(morgan("dev"));
server.use(errorHandler);
server.use(pathHandler);

export default server;