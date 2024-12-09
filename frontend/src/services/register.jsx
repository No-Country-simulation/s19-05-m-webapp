import { setUser } from "../store/slices/auth.slices";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const createUser = async (userData, setMessage) => {
    try {
        const response = await axios.post(`${BASE_URL}/users/`, userData);
        console.log('Creación de usuario exitosa', response.data);
        setMessage("¡Te has registrado exitosamente!");
    } catch (err) {
        const errorMessage = err.response?.data?.message || "Hubo un problema con el registro. Inténtalo nuevamente.";
        console.log(errorMessage);
        if (errorMessage == "User email already exists.") {
            setMessage("El correo ya está en uso.");
        }else {
            setMessage("Ocurrió un error.");
        }
    }
};

const checkUser = async (userEmail, userPassword, setMessage, onClose, dispatch) => {
    try {
        const response = await fetch(`${BASE_URL}/users/readone`, {
            method: 'POST',
            body: JSON.stringify({ email: userEmail }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error("No se pudo encontrar el usuario.");
        }

        const data = await response.json();

        if (!data || !data.data) {
            setMessage("No se ha encontrado una cuenta con ese correo.");
            return;
        }

        if (userPassword === data.data.password) { //comparar contraseñas por backend
            setMessage("La contraseña coincide");
            dispatch(setUser(data.data));
            onClose();
        } else {
            setMessage("La contraseña es incorrecta.");
        }
    } catch (error) {
        console.error(error);
        setMessage(error.message || "Ocurrió un error.");
    }
};

const checkGoogle = async (userEmail, dispatch) => {
    const response = await fetch(`${BASE_URL}/users/readone`, {
        method: 'POST',
        body: JSON.stringify({ email: userEmail }),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const data = await response.json();
    dispatch(setUser(data.data));
}

const userService = {
	createUser,
    checkUser,
    checkGoogle
};

export default userService;
