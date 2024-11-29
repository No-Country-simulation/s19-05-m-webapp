import { Request, Response, NextFunction } from "express";
import { verifyTokenUtil } from "../utils/token.util";

export interface AuthenticatedRequest extends Request {
  user?: any;
}

export const authJWTMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
  //retorno void porque no precisa de retorno
): void => {
  try {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
      res.status(401).json({ message: "Token not found" });
      return;
    }

    const token = authHeader.split(" ")[1]; //formato : Bearer token

    if (!token) {
      res.status(401).json({ message: "Invalid token" });
      return;
    }

    const verifyToken = verifyTokenUtil(token);

    //asignar el usuario a la request
    req.user = verifyToken;

    next();
  } catch (error) {
    console.error("Error in authJWTMiddleware:", error);
    res.status(401).json({ message: "Fatal error. Token expired or invalid" });
  }
};
