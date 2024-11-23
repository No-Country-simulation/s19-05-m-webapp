import { Router, Request, Response } from "express";
import { UserController } from "../controllers/users.controller";
import { isValidData } from "../middlewares/isValidData.mid";
import { isUser } from "../middlewares/isUser.mid";
import { hashPassword } from "../middlewares/hashPassword.mid";

const userRouter = Router();
const userController = new UserController();

// Create User
userRouter.post("/", isValidData, isUser, hashPassword, userController.CreateUser);

// Read all Users
userRouter.get("/", userController.ReadAll);

// Read User by id
userRouter.get("/:id", userController.ReadOnebyId);

// Read User by email
userRouter.post("/readone", userController.ReadOnebyEmail);

// Update users
userRouter.put("/:id", userController.UpdateUser);

// Delete users
userRouter.delete("/:id", userController.DeleteUser);



export default userRouter;
