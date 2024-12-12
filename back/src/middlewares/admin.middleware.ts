import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "./auth.middleware";
import { RoleName } from "../entity/Users.entity";

export const adminMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  if (req.user && req.user.role === RoleName.ADMIN) {
    next();
  } else {
    res.status(403).json({
      message: "Access denied: You are not an administrator",
    });
  }
};
