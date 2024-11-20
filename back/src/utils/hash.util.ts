import { genSaltSync, hashSync, compareSync } from "bcrypt";

// Función para crear un hash a partir de una contraseña
const createHashUtil = (password: string): string => {
    try {
        const salt = genSaltSync(10);  // Genera una sal con 10 rondas.
        const hashPassword = hashSync(password, salt);  // Crea el hash de la contraseña.
        return hashPassword;
    } catch (error) {
        throw error;
    }
};

// Función para verificar si la contraseña proporcionada coincide con el hash en la base de datos.
const verifyHashUtil = (password: string, dbPassword: string): boolean => {
    try {
        const verify = compareSync(password, dbPassword);  // Compara la contraseña con el hash
        return verify;
    } catch (error) {
        throw error;
    }
};

export { createHashUtil, verifyHashUtil };