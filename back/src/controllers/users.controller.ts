import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/users.service";
import ControllerHandler from "../handlers/controllers.handler";
import { createTokenUtil } from "../utils/token.util";
import { ObjectId } from "typeorm";

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *         - address
 *         - phone
 *         - role
 *       properties:
 *         id_users:
 *           type: integer
 *           description: The auto-generated ID of the user
 *         name:
 *           type: string
 *           description: The name of the user
 *           maxLength: 45
 *         email:
 *           type: string
 *           description: The email address of the user
 *           maxLength: 45
 *         password:
 *           type: string
 *           description: The password of the user (hashed)
 *           maxLength: 100
 *         active:
 *           type: boolean
 *           description: Indicates if the user is active or not
 *           default: true
 *         address:
 *           type: string
 *           description: The address of the user
 *           maxLength: 50
 *         phone:
 *           type: string
 *           description: The phone number of the user
 *           maxLength: 20
 *         role:
 *           type: string
 *           description: The role of the user, can be either "ADMINISTRATOR" or "USER"
 *           enum:
 *             - "ADMINISTRATOR"
 *             - "USER"
 *           default: "USER"
 *       example:
 *         id_users: 1
 *         name: "John Doe"
 *         email: "johndoe@example.com"
 *         password: "$2a$12$samplehashedpasswordhere"
 *         active: true
 *         address: "123 Main St, Springfield"
 *         phone: "123-456-7890"
 *         role: "USER"
 */
export class UserController {
  private readonly userService: UserService;

  constructor() {
    this.userService = new UserService();

    // Enlaza el contexto de los métodos
    this.CreateUser = this.CreateUser.bind(this);
    this.ReadAll = this.ReadAll.bind(this);
    this.loginController = this.loginController.bind(this);
    this.ReadOnebyId = this.ReadOnebyId.bind(this);
    this.ReadOnebyEmail = this.ReadOnebyEmail.bind(this);
    this.UpdateUser = this.UpdateUser.bind(this);
    this.DeleteUser = this.DeleteUser.bind(this);
    this.changeUserRoleController = this.changeUserRoleController.bind(this);
    this.updateUserInfoController = this.updateUserInfoController.bind(this);
  }

  async CreateUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const data = req.body;
      const user = await this.userService.createUser(data);

      return ControllerHandler.created("User created.", user, res);
    } catch (error) {
      console.error(error);
      return ControllerHandler.badRequest("Error creating user.", res);
      next(error);
    }
  }

  async loginController(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "Email and password are required" });
      }

      const user = await this.userService.login(email, password);
      if (!user) {
        return res.status(401).json({
          message: "User not found, invalid credentials or account is inactive",
        });
      }

      //crear token JWT
      const token = createTokenUtil({
        id_users: user.id_users,
        role: user.role,
      });

      //devolver el token y los datos del usuario
      return ControllerHandler.ok("Login successful", res, {
        token,
        user,
      });
    } catch (error) {
      console.error("Error in AuthController.login:", error);
      next(error);
    }
  }

  async ReadAll(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const users = await this.userService.read();
      return ControllerHandler.ok("Read all users.", res, users);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  async ReadOnebyId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { id } = req.params;
      const user = await this.userService.readById(parseInt(id));
      return ControllerHandler.ok("Read user by id.", res, user);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  async ReadOnebyEmail(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { email } = req.body;
      const user = await this.userService.readByEmail(email);
      return ControllerHandler.ok("Read user by email.", res, user);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  async UpdateUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { id } = req.params;
      const data = req.body;
      const user = await this.userService.updateUser(parseInt(id), data);
      return ControllerHandler.ok("Updated user.", res, user);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  async DeleteUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { id } = req.params;
      const user = await this.userService.deleteUser(parseInt(id));
      return ControllerHandler.ok("Deleted user.", res, user);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  async changeUserRoleController(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { id } = req.params;
      const { role } = req.body;

      //se puede verificar directamente de la entity
      if (role !== "ADMINISTRATOR" && role !== "USER") {
        return res.status(400).json({ message: "User role is not valid." });
      }

      const user = await this.userService.changeUserRole(parseInt(id), role); //parseint porque viene cmo string

      return ControllerHandler.ok(
        "User role has been changed successfully.",
        res,
        user
      );
    } catch (error) {
      console.error("Error in UserController.changeUserRoleController:", error);
      next(error);
    }
  }

  async updateUserInfoController(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { id } = req.params;
      const data = req.body;

      //unicos campos que puede actualizar el admin
      const allowedFields = ["name", "address", "phone", "active"];

      const updateData: Partial<any> = {};
      for (const element of allowedFields) {
        if (data.hasOwnProperty(element)) {
          updateData[element] = data[element];
        }
      }
      if (Object.keys(updateData).length === 0)
        return res.status(400).json({ message: "No fields to update." });

      const user = await this.userService.updateUserInfo(
        parseInt(id),
        updateData
      );

      return ControllerHandler.ok(
        "User information has been updated successfully.",
        res,
        user
      );
    } catch (error) {
      console.error("Error in UserController.updateUserInfoController:", error);
      next(error);
    }
  }
}
