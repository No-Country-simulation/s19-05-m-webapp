import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as CustomStrategy } from "passport-custom";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import { Request, Response, NextFunction } from "express";
import {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  BASE_URL,
} from "../config/env";
import { UserService } from "../services/users.service";
import { createHashUtil } from "../utils/hash.util";
import { createTokenUtil } from "../utils/token.util";
import { verifyHashUtil } from "../utils/hash.util";
import { verifyTokenUtil } from "../utils/token.util";

declare global {
  namespace Express {
    interface Request {
      token?: string;
      session: {
        role: string;
        user_id: number;
      };
    }

  }
}

interface CustomError extends Error {
  statusCode?: number;
}

const userService = new UserService();

passport.use("register", new LocalStrategy(
  { passReqToCallback: true, usernameField: "email" },
  async (req: Request, email: string, password: string, done: (error: any, user?: any) => void) => {
    try {
      // Validacion de data que es si o si es required:true.
      if (!email || !password) {
        const error: CustomError = new Error("Email and password are required");
        error.statusCode = 400;
        return done(error);
      };

      // Existencia de User con ese email
      const one = await userService.readByEmail(email);

      // Validacion de User
      if (one) {
        const error: CustomError = new Error("User already exists");
        error.statusCode = 409;
        return done(error);
      }
      // Hasheo de contraseña y creacion de user.
      req.body.password = createHashUtil(password);
      const data = req.body;
      const user = await userService.createUser(data);
      return done(null, user);
    } catch (error) {
      return done(error);
    };
  }
)
);

passport.use("login", new LocalStrategy(
  { passReqToCallback: true, usernameField: "email" },
  async (req: Request, email: string, password: string, done: (error: any, user?: any) => void) => {
    try {
      // Existencia de User con ese email
      let user = await userService.readByEmail(email);
      if (!user) {
        const error: CustomError = new Error("USER NOT FOUND, INVALID EMAIL.");
        error.statusCode = 401;
        return done(error);
      }
      const dbPassword = user.password;
      const verify = verifyHashUtil(password, dbPassword);
      if (!verify) {
        const error: CustomError = new Error("INVALID PASSWORD");
        error.statusCode = 401;
        return done(error);
      }
      req.token = createTokenUtil({
        role: user.role,
        user_id: user.id_users
      });
      user = await userService.updateUser(user.id_users, { isOnline: true });
      user.password = "";
      return done(null, user);
    } catch (error) {
      return done(error);
    };
  }
)
);

passport.use("online", new CustomStrategy(async (req: Request, done: (error: any, user?: any) => void) => {
  try {
    // Consultar existencia del usuario.
    const token = req.headers['token'] as string | undefined;
    // Si no existe, INVALID TOKEN.
    if (!token) {
      const error: CustomError = new Error("INVALID TOKEN.");
      error.statusCode = 401;
      return done(error);
    }
    const data: any = verifyTokenUtil(token);
    const user_id = data.user_id;
    const user = await userService.readById(user_id);
    req.token = token;
    return done(null, user);
  } catch (error) {
    return done(error);
  };
}
)
);

passport.use("signout", new CustomStrategy(async (req: Request, done: (error: any, user?: any) => void) => {
  try {
    const token = req.headers['token'] as string | undefined;
    if (!token) {
      const error: CustomError = new Error("USER NOT LOGGED");
      error.statusCode = 401;
      return done(error);
    }
    delete req.token;
    return done(null, { user: null });
  } catch (error) {
  return done(error);
};
}
)
);

passport.use("google", new GoogleStrategy(
  {
    clientID: GOOGLE_CLIENT_ID || "",
    clientSecret: GOOGLE_CLIENT_SECRET || "",
    passReqToCallback: true,
    callbackURL: `${BASE_URL}/api/sessions/auth/google/callback`,
  },
  async (
    req: Request,
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: any
  ) => {
    try {
      // Destructuro los datos de google. Id y foto.
      const { id, picture } = profile;
      // Buscar al usuario por email
      let user = await userService.readByEmail(id);
      // Si no existe, crearlo
      if (!user) {
        user = await userService.createUser({
          email: id,
          name: profile.displayName,
          photo: picture,
          address: "", // Proporciona un valor, aunque sea vacío
          password: createHashUtil(id), // Usa un hash para la contraseña
          phone: "", // Asegúrate de incluir un valor aquí
        });
      } else {
        // Generar token y asignarlo al Request
        req.token = createTokenUtil({ role: user.role, user: user.id_users });
        req.session.role = user.role;
        req.session.user_id = user.id_users;
      }
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
)
);

export default passport;
