import { Request, Response, NextFunction } from "express";

export async function isValidData(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
        const data = req.body;
        // Desarrollar validacion de datos.
        console.log("Entro al isValidData.")
        next();
    } catch (error) {
        console.error(error);
        next(error);
    }
}