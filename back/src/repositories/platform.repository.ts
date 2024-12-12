import { AppDataSource } from "../config/db-config";
import { Platforms } from "../entity/Platforms.entity";

export const platformRepository = AppDataSource.getRepository(Platforms);