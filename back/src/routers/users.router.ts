import { Router, Request, Response } from "express";
import { UserController } from "../controllers/users.controller";

const userRouter = Router();
const userController = new UserController();

// Create User
userRouter.post("/", userController.CreateUser);

// Read all Users
userRouter.get("/:id", (req: Request, res: Response) => {
    res.send("Este es el POST de User para READ ALL USERS.");
});

// Read User by id
userRouter.get("/:id", (req: Request, res: Response) => {
    res.send("Este es el POST de User para READ USER BY ID.");
});

// Read User by email
userRouter.get("/:email", (req: Request, res: Response) => {
    res.send("Este es el POST de User para READ USERS BY EMAIL.");
});

// Update users
userRouter.put("/:id", (req: Request, res: Response) => {
    res.send("Este es el PUT de User para UPDATE USERS.");
});

// Delete users
userRouter.delete("/:id", (req: Request, res: Response) => {
    res.send("Este es el DELETE de User para DESTROY USERS.");
});



export default userRouter;

/* Esta en js.
async function createUser(req, res, next) {
    try {
        const message = "USER CREATED"
        const data = req.body
        const response = await create(data)
        return res.status(201).json({ response, message })
    } catch (error) {
        return next(error)
    }
}
async function readUsers(req, res, next) {
    try {
        const message = "USERS FOUND"
        const response = await read()
        return res.status(200).json({ response, message })
    } catch (error) {
        return next(error)
    }
}
async function updateUser(req, res, next) {
    try {
        const { id } = req.params
        const data = req.body
        const message = "USER UPDATED"
        const response = await update(id, data)
        return res.status(200).json({ response, message })
    } catch (error) {
        return next(error)
    }
}
async function destroyUser(req, res, next) {
    try {
        const { id } = req.params
        const message = "USER DELETED"
        const response = await destroy(id)
        return res.status(200).json({ response, message })
    } catch (error) {
        return next(error)
    }
}
*/