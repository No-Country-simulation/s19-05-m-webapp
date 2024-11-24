import { Request, Response, NextFunction } from "express";
import { PlatformService } from "../services/platform.service";
import ControllerHandler from "../handlers/controllers.handler";
import { Platforms } from "../entity/Platforms.entity";
import { PlatfomsDto } from "../dto/platform.dto";

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
  async getAllPlatformsController(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const platforms = await this.platformService.getAllPlatforms();
      return ControllerHandler.ok("Platforms retrieved successfully", res, platforms);
    } catch (error) {
      next(error);
    }
  }

  // Obtener una plataforma por ID
  async getPlatformByIdController(req: Request, res: Response, next: NextFunction): Promise<any> {
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
  async createPlatformController(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const platformData: PlatfomsDto = req.body;

      const newPlatform = await this.platformService.createPlatform(platformData);

      return ControllerHandler.ok("Platform created successfully", res, newPlatform);
    } catch (error) {
      next(error);
    }
  }

  // Eliminar una plataforma
  async deletePlatformController(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const { id } = req.params;
      const platformId = parseInt(id, 10);

      if (isNaN(platformId) || platformId <= 0) {
        return ControllerHandler.badRequest("Invalid platform ID", res);
      }

      const deletedPlatform = await this.platformService.deletePlatform(platformId);

      if (!deletedPlatform) {
        return ControllerHandler.notFound("Platform not found", res);
      }

      return ControllerHandler.ok("Platform deleted successfully", res, deletedPlatform);
    } catch (error) {
      next(error);
    }
  }
}
