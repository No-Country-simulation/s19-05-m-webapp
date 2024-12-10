import { platformRepository } from "../repositories/platform.repository";
import { Platforms } from "../entity/Platforms.entity";
import { PlatfomsDto } from "../dto/platform.dto";
import { In } from "typeorm";

export class PlatformService {
  // Obtener todas las plataformas
  async getAllPlatforms(): Promise<Platforms[]> {
    return platformRepository.find();
  }

  // Obtener una plataforma por ID
  async getPlatformById(id: number): Promise<Platforms | null> {
    return platformRepository.findOne({ where: { id_platform: id } });
  }

  // Crear una plataforma únicamente si no existe en la base de datos
  async createPlatformIfNotExists(data: PlatfomsDto): Promise<Platforms> {
    const existing = await platformRepository.findOne({
      where: { name: data.name },
    });
    if (existing) {
      return existing;
    }
    const newPlatform = platformRepository.create(data);
    return platformRepository.save(newPlatform);
  }

  // Dado un array de plataformas DTO, obtiene las existentes y crea las que no existen, retornando el total.
  async findOrCreatePlatforms(
    platformDtos: PlatfomsDto[]
  ): Promise<Platforms[]> {
    const platformModel = platformDtos.map((p) => p.model);

    // Buscar plataformas existentes por modelos
    const existingPlatforms = await platformRepository.find({
      where: { model: In(platformModel) },
    });

    const existingModels = existingPlatforms.map((p) => p.model);

    // Filtrar las que no existen
    const newPlatformDtos = platformDtos.filter(
      (p) => !existingModels.includes(p.model)
    );

    // Crear las nuevas plataformas que no están en la base
    const platformsToCreate = platformRepository.create(newPlatformDtos);

    // Guardar todas las nuevas plataformas de una sola vez (una sola consulta)
    const newPlatforms =
      platformsToCreate.length > 0
        ? await platformRepository.save(platformsToCreate)
        : [];

    // Unir las existentes con las nuevas
    return [...existingPlatforms, ...newPlatforms];
  }

  // Eliminar una plataforma por ID
  async deletePlatform(id: number): Promise<Platforms | null> {
    const platformToDelete = await this.getPlatformById(id);
    if (!platformToDelete) return null;

    await platformRepository.remove(platformToDelete);
    return platformToDelete;
  }

  // Obtener una plataforma con productos asociados
  async getPlatformWithProducts(id: number): Promise<Platforms | null> {
    return platformRepository.findOne({
      where: { id_platform: id },
      relations: ["products"],
    });
  }
}
