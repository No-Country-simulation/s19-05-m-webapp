import { Router } from "express";
import productRouter from "./products.router";
import userRouter from "./users.router";
import sessionRouter from "./sessions.router";

const indexRouter = Router()

indexRouter.use("/products", productRouter)
indexRouter.use("/users", userRouter)
indexRouter.use("/sessions", sessionRouter)

export default indexRouter;