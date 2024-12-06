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
export const SECRET_KEY = process.env.SECRET_KEY|| "s19-webapp";

export const PAYPAL_CLIENT = process.env.PAYPAL_CLIENT;
export const PAYPAL_SECRET = process.env.PAYPAL_SECRET;
export const PAYPAL_API = "https://api-m.sandbox.paypal.com";