import "reflect-metadata";
import { join } from "path";
import { DataSource } from "typeorm";
import { config } from "dotenv";
import { Product } from "../entity/Product.entity";
import { User } from "../entity/Users.entity";
import { Platforms } from "../entity/Platforms.entity";
config();

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.MYSQLHOST || "mysql",
  port: parseInt(process.env.MYSQLPORT || "3306"),
  username: process.env.MYSQLUSER || "root",
  password: process.env.MYSQLPASSWORD || "root",
  database: process.env.MYSQL_DATABASE || "back",
  synchronize: true,
  logging: true,
  entities: [Product, Platforms],
});
