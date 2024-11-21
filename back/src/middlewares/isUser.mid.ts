import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/users.service";

const userService = new UserService();

export async function isUser(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
        const { email } = req.body;
        const user = await userService.readByEmail(email);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        console.log("User exists:", user);
        next();
    } catch (error) {
        console.error("Error in isUser middleware:", error);
        next(error);
    }
}
