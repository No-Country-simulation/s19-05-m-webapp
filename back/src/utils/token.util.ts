import jwt, { JwtPayload } from "jsonwebtoken";
import { SECRET_KEY } from "../config/env";

interface TokenData {
  [key: string]: any; // Puedes especificar el tipo de los datos que pasas en el token, si lo sabes
}

function createTokenUtil(data: TokenData): string {
  if (!SECRET_KEY) {
    throw new Error("SECRET_KEY is not defined in environment variables");
  }
  const token = jwt.sign(
    data,
    SECRET_KEY,
    { expiresIn: 60 * 60 * 24 * 7 } // Expira en 7 dias el token.
  );
  return token;
}

function verifyTokenUtil(token: string): JwtPayload | string {
  if (!SECRET_KEY) {
    throw new Error("SECRET_KEY is not defined in environment variables");
  }

  const verifyData = jwt.verify(token, SECRET_KEY);
  return verifyData;
}

export { createTokenUtil, verifyTokenUtil };
