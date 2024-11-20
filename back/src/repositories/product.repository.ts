import { AppDataSource } from "../config/db-config";
import { Product } from "../entity/Product.entity";

export const productRepository = AppDataSource.getRepository(Product);