import { Router } from "express";
import { ShoppingController } from "../controllers/shopping.controller";

const shoppingRouter = Router();
const shoppingController = new ShoppingController();

shoppingRouter.get("", shoppingController.getAllShoppingController);
shoppingRouter.post("", shoppingController.createShoppingController);
shoppingRouter.put("/:user/:product", shoppingController.updateShoppingController);

export default shoppingRouter;