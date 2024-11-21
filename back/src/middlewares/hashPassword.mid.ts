import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/users.service";
import { createHashUtil } from "../utils/hash.util";

const userService = new UserService();

export async function hashPassword(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
        const { password } = req.body;
        req.body.password = createHashUtil(password);
        console.log("Entro al hashPassword.");
        next();
    } catch (error) {
        console.error("Error in isUser middleware:", error);
        next(error);
    }
}
