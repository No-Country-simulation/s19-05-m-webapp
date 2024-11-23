import { Router } from "express";
import { PlatformController } from "../controllers/platform.controller";

const platformRouter = Router();
const platformController = new PlatformController();

platformRouter.get("/", platformController.getAllPlatformsController);
platformRouter.get("/:id", platformController.getPlatformByIdController);
platformRouter.post("/", platformController.createPlatformController);
platformRouter.delete("/:id", platformController.deletePlatformController);

export default platformRouter;