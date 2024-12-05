import { Router } from "express";
import { CheckoutController } from "../controllers/checkout.controller";

const checkoutRouter = Router();
const checkoutController = new CheckoutController();

checkoutRouter.post("/order", checkoutController.createOrderController);
checkoutRouter.get("/capture", checkoutController.captureOrderController);
checkoutRouter.get("/cancel", checkoutController.cancelOrderController);

checkoutRouter.get("/", checkoutController.getAllCheckoutController);
checkoutRouter.get("/:id", checkoutController.getCheckoutByIdController);
checkoutRouter.get("/status/:status", checkoutController.getCheckoutByIdController);

export default checkoutRouter;