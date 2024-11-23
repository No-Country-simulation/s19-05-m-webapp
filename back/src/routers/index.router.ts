import { Router } from "express";
import productRouter from "./products.router";
import userRouter from "./users.router";
import sessionRouter from "./sessions.router";
import platformRouter from "./platform.router";

const indexRouter = Router()

/**
 * @openapi
 * /tasks:
 *     get:
 *         description: Tests
 */

indexRouter.use("/products", productRouter)
indexRouter.use("/users", userRouter)
indexRouter.use("/sessions", sessionRouter)
indexRouter.use("/platform", platformRouter)

export default indexRouter;