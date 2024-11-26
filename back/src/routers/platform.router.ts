import { Router } from "express";
import { PlatformController } from "../controllers/platform.controller";
import { validateCreatePlatforms } from "../middlewares/platforms.mid";

const platformRouter = Router();
const platformController = new PlatformController();
/**
 * @swagger
 * components:
 *   schemas:
 *     Platforms:
 *       type: object
 *       required:
 *         - name
 *         - model
 *         - product
 *       properties:
 *         id_platform:
 *           type: integer
 *           description: The auto-generated ID of the platform
 *         name:
 *           type: string
 *           description: The name of the platform (e.g., PlayStation, Xbox)
 *           maxLength: 50
 *         model:
 *           type: string
 *           description: The model of the platform (e.g., PS5, Xbox Series X)
 *           maxLength: 50
 *         product:
 *           type: object
 *           description: The associated product for this platform
 *           $ref: '#/components/schemas/Product'
 *       example:
 *         idPlatform: 1
 *         name: "PlayStation 5"
 *         model: "PS5"
 *         product:
 *           id_product: 1
 *           title: "Game Title"
 *           price: 59.99
 *           available: true
 *           description: "An exciting new game"
 *           type: "Game"
 *           image: "/images/game.jpg"
 *           genre: "Action"
 *           stock: 50
 */
platformRouter.get("/", platformController.getAllPlatformsController);
platformRouter.get("/:id", platformController.getPlatformByIdController);
platformRouter.post("/", validateCreatePlatforms, platformController.createPlatformController);
platformRouter.delete("/:id", platformController.deletePlatformController);

export default platformRouter;