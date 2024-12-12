import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as CustomStrategy } from "passport-custom";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { Request, Response, NextFunction } from "express";
import {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  BASE_URL,
  SECRET_KEY
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

interface JwtPayload {
  user_id: number; // ID del usuario
  role: string; // Rol del usuario
  email: string; // Email del usuario
  isOnline: boolean; // Estado del usuario
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
      const existUser = await userService.readByEmail(email);

      // Validacion de User
      if (existUser) {
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
      // SI no existe, la respuesta.
      if (!user) {
        const error: CustomError = new Error("USER NOT FOUND, INVALID EMAIL.");
        error.statusCode = 401;
        return done(error);
      }
      // Obtenemos la contraseña hasheada dentro de la Base de datos.
      const dbPassword = user.password;
      // Verificamos compatibilidad. {Password desde la BBDD} vs {password req.body}.
      const verify = verifyHashUtil(password, dbPassword);
      // Si no es compatible, la respuesta.
      if (!verify) {
        const error: CustomError = new Error("INVALID PASSWORD");
        error.statusCode = 401;
        return done(error);
      }
      // Creamos el token, con la informacion que queramos.
      const token = createTokenUtil({
        role: user.role,
        user_id: user.id_users,
        email: user.email,
        isOnline: true
      });
      // Lo almacenamos en req.token. Para posterior manipulación. 
      req.token = token;
      //user = await userService.updateUser(user.id_users, { isOnline: true });
      return done(null, user);
    } catch (error) {
      return done(error);
    };
  }
)
);

passport.use("online", new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromExtractors([(req => req?.cookies?.token)]),
  secretOrKey: SECRET_KEY
}, async (data: JwtPayload, done) => {
  try {
    // Extraemos el id y isOnline de la data del token.
    const { user_id, isOnline } = data;
    // Obtenemos el user.
    const user = await userService.readById(user_id);
    if (!user) {
      const error: CustomError = new Error("USER NOT FOUND");
      error.statusCode = 404;
      return done(error);
    }
    // Si es false, respuesta.
    if (!isOnline) {
      const error: CustomError = new Error("USER IS NOT ONLINE");
      error.statusCode = 401;
      return done(error);
    }
    return done(null, user);
  } catch (error) {
    return done(error);
  }
}

)
);

passport.use("signout", new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromExtractors([(req => req?.cookies?.token)]),
  secretOrKey: SECRET_KEY
}, async (data: JwtPayload, done) => {
  try {
    const { user_id } = data;
    // Consultamos al usuario desde la base de datos
    let user: any = await userService.readById(user_id);
    if (!user) {
      const error: CustomError = new Error("USER NOT FOUND");
      error.statusCode = 404;
      return done(error);
    }
    return done(null, user);
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
      let user: any | null | undefined  = await userService.readByEmail(id);
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
      }
      // Generar token y asignarlo al Request
      const token = createTokenUtil({
        role: user.role,
        user_id: user.id_users,
        email: user.email,
        isOnline: true
      });
      // Lo almacenamos en req.token. Para posterior manipulación. 
      req.token = token;
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
)
);

export default passport;
