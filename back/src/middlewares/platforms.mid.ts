import { Request, Response, NextFunction } from 'express';
import ControllerHandler from '../handlers/controllers.handler';


export const validateCreatePlatforms = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const {
    name,
    model
  } = req.body;


  if (!name || typeof name !== "string") {
    ControllerHandler.badRequest("Name is required and must be a string", res);
  }

  if (!model || typeof model !== "string") {
    ControllerHandler.badRequest("Model is required and must be a string", res);
  }

  next();

}