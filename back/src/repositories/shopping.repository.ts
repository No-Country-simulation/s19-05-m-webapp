import { AppDataSource } from "../config/db-config";
import { Shopping } from "../entity/Shopping.entity";

export const shoppingRepository = AppDataSource.getRepository(Shopping);