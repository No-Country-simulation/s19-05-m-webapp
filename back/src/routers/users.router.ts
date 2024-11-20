import { Router, Request, Response } from "express";


const userRouter = Router();

// creacion
userRouter.get("/", (req: Request, res: Response) => {
    res.send("Este es el GET de User para READ USERS.");
});//readUsers)

userRouter.post("/", (req: Request, res: Response) => {
    res.send("Este es el POST de User para CREATE USERS.");
});//createUser) 
userRouter.put("/:id", (req: Request, res: Response) => {
    res.send("Este es el PUT de User para UPDATE USERS.");
});// updateUser)
userRouter.delete("/:id", (req: Request, res: Response) => {
    res.send("Este es el DELETE de User para DESTROY USERS.");
});// destroyUser)



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