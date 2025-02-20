import { Router } from "express";
import productRouter from "./products.router";
import userRouter from "./users.router";
import sessionRouter from "./sessions.router";
import platformRouter from "./platform.router";
import shoppingRouter from "./shopping.router";
import checkoutRouter from "./checkout.router";

const indexRouter = Router()

indexRouter.use("/products", productRouter)
indexRouter.use("/users", userRouter)
indexRouter.use("/sessions", sessionRouter)
indexRouter.use("/platform", platformRouter)
indexRouter.use("/shopping", shoppingRouter)
indexRouter.use("/checkouts", checkoutRouter)

export default indexRouter;