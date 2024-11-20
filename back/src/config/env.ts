import { config } from "dotenv"
config();

export const PORT = process.env.PORT || 3002;
export const MYSQLHOST = process.env.MYSQLHOST;
export const MYSQLPORT = process.env.MYSQLPORT;
export const MYSQLUSER = process.env.MYSQLUSER;
export const MYSQLPASSWORD = process.env.MYSQLPASSWORD;
export const MYSQL_DATABASE = process.env.MYSQL_DATABASE;
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
export const BASE_URL = process.env.BASE_URL;