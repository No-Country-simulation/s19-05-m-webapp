import { AppDataSource } from "../config/db-config";
import { Checkout } from "../entity/Checkout.entity";

export const checkoutRepository = AppDataSource.getRepository(Checkout);