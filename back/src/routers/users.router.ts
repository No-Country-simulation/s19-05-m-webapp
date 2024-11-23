import { Router, Request, Response } from "express";
import { UserController } from "../controllers/users.controller";
import { isValidData } from "../middlewares/isValidData.mid";
import { isUser } from "../middlewares/isUser.mid";
import { hashPassword } from "../middlewares/hashPassword.mid";

const userRouter = Router();
const userController = new UserController();

// Create User
userRouter.post("/", isValidData, isUser, hashPassword, userController.CreateUser);

<<<<<<< HEAD
userRouter.post("/", (req: Request, res: Response) => {
    res.send("Este es el POST de User para CREATE USERS.");
});//createUser) 

userRouter.put("/:id", (req: Request, res: Response) => {
    res.send("Este es el PUT de User para UPDATE USERS.");
});// updateUser)

userRouter.delete("/:id", (req: Request, res: Response) => {
    res.send("Este es el DELETE de User para DESTROY USERS.");
});// destroyUser)
=======
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
>>>>>>> 0e976e738cc0ec1774053054192a4342fe22b6e2



export default userRouter;
