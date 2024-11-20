import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, BASE_URL } from "../config/env";
import { createTokenUtil } from "../utils/token.util";
import { createHashUtil } from "../utils/hash.util";

passport.use("google", new GoogleStrategy(
    {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        passReqToCallback: true,
        callbackURL: `${BASE_URL}/sessions/google/cb`
    },
    async (req: Request, accessToken: string, refreshToken: string, profile: Profile, done: Function) => {
        try {
            // Desestructuro los datos de Google (ID y foto/avatar)
            const { id, picture } = profile;

            // Como estrategia de terceros, NO SE SUELE registrar al usuario por su email, sino por su identificador en la base de datos
            let user = await readByEmail(id);

            // Si el usuario no existe, lo crea y registra
            if (!user) {
                user = await create({
                    email: id,
                    photo: picture,
                    password: createHashUtil(id)  // Asume que usas un hash del ID para la "contraseña"
                });
            }

            // Genera un token para la sesión
            req.token = createTokenUtil({ role: user.role, user: user._id });

            // Regresa al objeto user dentro del done() para que se guarde en la sesión
            return done(null, user);

        } catch (error) {
            return done(error);
        }
    }
));

export default passport;