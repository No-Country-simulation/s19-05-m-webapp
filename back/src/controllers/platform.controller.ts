import { Request, Response, NextFunction } from "express";
import { PlatformService } from "../services/platform.service";
import ControllerHandler from "../handlers/controllers.handler";
import { PlatfomsDto } from "../dto/platform.dto";

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
export class PlatformController {
  private readonly platformService: PlatformService;

  constructor() {
    this.platformService = new PlatformService();

    // Enlaza el contexto de los métodos
    this.getAllPlatformsController = this.getAllPlatformsController.bind(this);
    this.getPlatformByIdController = this.getPlatformByIdController.bind(this);
    this.createPlatformController = this.createPlatformController.bind(this);
    this.deletePlatformController = this.deletePlatformController.bind(this);
  }

  // Obtener todas las plataformas
  async getAllPlatformsController(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const platforms = await this.platformService.getAllPlatforms();
      return ControllerHandler.ok(
        "Platforms retrieved successfully",
        res,
        platforms
      );
    } catch (error) {
      next(error);
    }
  }

  // Obtener una plataforma por ID
  async getPlatformByIdController(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { id } = req.params;
      const platformId = parseInt(id, 10);

      if (isNaN(platformId) || platformId <= 0) {
        return ControllerHandler.badRequest("Invalid platform ID", res);
      }

      const platform = await this.platformService.getPlatformById(platformId);

      if (!platform) {
        return ControllerHandler.notFound("Platform not found", res);
      }

      return ControllerHandler.ok(`Platform with ID: ${id}`, res, platform);
    } catch (error) {
      next(error);
    }
  }

  // Crear una nueva plataforma
  async createPlatformController(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const platformData: PlatfomsDto = req.body;

      const newPlatform = await this.platformService.createPlatformIfNotExists(
        platformData
      );

      return ControllerHandler.ok(
        "Platform created successfully",
        res,
        newPlatform
      );
    } catch (error) {
      next(error);
    }
  }

  // Eliminar una plataforma
  async deletePlatformController(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { id } = req.params;
      const platformId = parseInt(id, 10);

      if (isNaN(platformId) || platformId <= 0) {
        return ControllerHandler.badRequest("Invalid platform ID", res);
      }

      const deletedPlatform = await this.platformService.deletePlatform(
        platformId
      );

      if (!deletedPlatform) {
        return ControllerHandler.notFound("Platform not found", res);
      }

      return ControllerHandler.ok(
        "Platform deleted successfully",
        res,
        deletedPlatform
      );
    } catch (error) {
      next(error);
    }
  }
}
