import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
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

const userService = new UserService();

passport.use(
  "google",
  new GoogleStrategy(
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
