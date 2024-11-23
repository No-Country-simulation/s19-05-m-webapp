import { AppDataSource } from "../config/db-config";
import { User } from "../entity/Users.entity";

export const userRepository = AppDataSource.getRepository(User);