import { Router } from "express";
import { PlatformController } from "../controllers/platform.controller";
import { validateCreatePlatforms } from "../middlewares/platforms.mid";

const platformRouter = Router();
const platformController = new PlatformController();

platformRouter.get("/", platformController.getAllPlatformsController);
platformRouter.get("/:id", platformController.getPlatformByIdController);
platformRouter.post(
  "/",
  /* authJWTMiddleware, adminMiddleware, */ validateCreatePlatforms,
  platformController.createPlatformController
);
platformRouter.delete(
  "/:id",
  /* authJWTMiddleware, adminMiddleware, */ platformController.deletePlatformController
);

export default platformRouter;
