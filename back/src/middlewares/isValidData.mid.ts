import { Request, Response, NextFunction } from "express";

export async function isValidData(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  try {
    const { name, email, password, address, phone } = req.body; //desestructuro los datos del body para poder verificarlos

    //validaciones minimas
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    if (name.length > 20) {
      return res
        .status(400)
        .json({ message: "The name must be less than 20 characters" });
    }

    if (password.length > 50) {
      return res.status(400).json({
        message: "The password must be less than 50 characters",
      });
    }

    if (password.length < 4) {
      return res
        .status(400)
        .json({ message: "The password must be at least 4 characters" });
    }

    // console.log("Entro al isValidData.");
    next();
  } catch (error) {
    console.error(error);
    next(error);
  }
}
