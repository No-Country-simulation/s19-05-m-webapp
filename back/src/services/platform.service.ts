import { platformRepository } from "../repositories/platform.repository";
import { Platforms } from "../entity/Platforms.entity";
import { PlatfomsDto } from "../dto/platform.dto";

export class PlatformService {
  // Obtener todas las plataformas
  async getAllPlatforms(): Promise<Platforms[]> {
    return await platformRepository.find();
  }

  // Obtener una plataforma por ID
  async getPlatformById(id: number): Promise<Platforms | null> {
    return await platformRepository.findOne({ where: { idPlatform: id } });
  }

  // Crear una nueva plataforma
  async createPlatform(data: PlatfomsDto): Promise<Platforms> {
    const newPlatform = platformRepository.create(data);
    return await platformRepository.save(newPlatform);
  }

  // Eliminar una plataforma por ID
  async deletePlatform(id: number): Promise<Platforms | null> {
    const platformToDelete = await this.getPlatformById(id);
    if (!platformToDelete) return null;

    await platformRepository.remove(platformToDelete);
    return platformToDelete;
  }
}
