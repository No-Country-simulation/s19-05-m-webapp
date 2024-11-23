import { Router } from "express";
import { ProductController } from '../controllers/product.controller';

const productRouter = Router();
const productController = new ProductController();

productRouter.get('/', productController.getProductsController);
productRouter.get("/:id", productController.getProductByIdController);

export default productRouter;