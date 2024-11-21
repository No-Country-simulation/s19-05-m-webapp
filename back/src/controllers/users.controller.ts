import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/users.service";
import ControllerHandler from "../handlers/controllers.handler";

export class UserController {
    private readonly userService: UserService;

    constructor() {
        this.userService = new UserService();
        // Enlaza el contexto de los métodos
        this.CreateUser = this.CreateUser.bind(this);
        this.ReadAll = this.ReadAll.bind(this);
        this.ReadOnebyId = this.ReadOnebyId.bind(this);
        this.ReadOnebyEmail = this.ReadOnebyEmail.bind(this);
        this.UpdateUser = this.UpdateUser.bind(this);
        this.DeleteUser = this.DeleteUser.bind(this);
    }

    async CreateUser(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const data = req.body;
            const user = await this.userService.createUser(data);
            return ControllerHandler.created("User created.", user, res)
        } catch (error) {
            console.error(error);
            next(error);
        }
    }

    async ReadAll(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const users = await this.userService.read();
            return ControllerHandler.ok("Read all users.", res, users)
        } catch (error) {
            console.error(error);
            next(error);
        }
    }

    async ReadOnebyId(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const { id } = req.params;
            const user = await this.userService.readById(parseInt(id));
            return ControllerHandler.ok("Read user by id.", res, user)
        } catch (error) {
            console.error(error);
            next(error);
        }
    }

    async ReadOnebyEmail(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const { email } = req.body;
            const user = await this.userService.readByEmail(email);
            return ControllerHandler.ok("Read user by email.", res, user)
        } catch (error) {
            console.error(error);
            next(error);
        }
    }

    async UpdateUser(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const { id } = req.params;
            const data = req.body;
            const user = await this.userService.updateUser(parseInt(id), data);
            return ControllerHandler.ok("Updated user.", res, user)
        } catch (error) {
            console.error(error);
            next(error);
        }
    }

    async DeleteUser(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const { id } = req.params;
            const user = await this.userService.deleteUser(parseInt(id));
            return ControllerHandler.ok("Deleted user.", res, user)
        } catch (error) {
            console.error(error);
            next(error);
        }
    }
}

