import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/users.service";
import ControllerHandler from "../handlers/controllers.handler";

export class UserController {
    private readonly userService: UserService;

    constructor() {
        this.userService = new UserService();

        // Enlaza el contexto de los métodos
        // this.getProductsWithLimitController = this.getProductsWithLimitController.bind(this);
        // this.getProductByIdController = this.getProductByIdController.bind(this);
    }

    async CreateUser(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const data = req.body;
            const user = await this.userService.createUser(data);
            return ControllerHandler.created("User created.", user, res)
        } catch (error) {
            next(error);
        }
    }


}