import cors from "cors";
import morgan from "morgan";
import express from "express";

const server = express();

server.use(cors());
server.use(express.json());
server.use(morgan("dev"))

export default server;