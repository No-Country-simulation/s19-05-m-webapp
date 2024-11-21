import { Router } from "express";
import { ProductController } from "../controllers/product.controller";

const productRouter = Router();
const productController = new ProductController();

productRouter.get("/", productController.getProductsWithLimitController);
productRouter.get("/:id", productController.getProductByIdController);

productRouter.post(
  "/create-product",
  productController.createProductController
);

productRouter.put(
  "/update-product/:id",
  productController.updateProductController
);

export default productRouter;
