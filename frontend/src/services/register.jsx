import { setUser } from "../store/slices/auth.slices";
import { logout } from "../store/slices/auth.slices";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const createUser = async (userData, setMessage, dispatch) => {
    try {
        const response = await axios.post(`${BASE_URL}/sessions/register`, userData);
        console.log('Creación de usuario exitosa', response.data);
        setMessage("¡Te has registrado exitosamente!");
        try {
            const response = await fetch(`${BASE_URL}/sessions/login`, {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify({ email: userData.email, password: userData.password }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            
            const data = await response.json();
            if (data.user) {
                dispatch(setUser(data.user));
            }
    
        } catch (error) {
            console.error(error);
            setMessage(error.message || "Ocurrió un error.");
        }
    } catch (err) {
        const errorMessage = err.response?.data?.message || "Hubo un problema con el registro. Inténtalo nuevamente.";
        if (errorMessage == "User email already exists." || "User already exists") {
            setMessage("El correo ya está en uso.");
        }else {
            setMessage("Ocurrió un error.");
        }
    }
    
};

const checkUserLogin = async (userEmail, userPassword, setMessage, onClose, dispatch) => {
    try {
        const response = await fetch(`${BASE_URL}/sessions/login`, {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({ email: userEmail, password: userPassword }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error("El correo o la contraseña son incorrectos.");
        }
        
        const data = await response.json();
        if (data.user) {
            dispatch(setUser(data.user));
            onClose();
        }

    } catch (error) {
        console.error(error);
        setMessage(error.message || "Ocurrió un error.");
    }
};

const checkUser = async (userEmail, userPassword, setMessage, dispatch) => {
    try {
        const response = await fetch(`${BASE_URL}/sessions/login`, {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({ email: userEmail, password: userPassword }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        
        const data = await response.json();
        if (data.user) {
            dispatch(setUser(data.user));
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
};

const userOnline = async () => {
    try {
        const response = await fetch(`${BASE_URL}/sessions/online`, {
            method: 'POST',
            body: null,
        });

        if (!response.ok) {
            throw new Error(response.status);
        }

        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error(error);
    }
};

const signOut = async (dispatch) => {
    try {
        const response = await fetch(`${BASE_URL}/sessions/signout`, {
            method: 'POST',
            body: null,
        });

        if (!response.ok) {
            throw new Error(response.status);
        }
        dispatch(logout());
    } catch (error) {
        console.error("Error al desconectarse: ", error);
        dispatch(logout());
    }
};

const userService = {
	createUser,
    checkUserLogin,
    checkUser,
    checkGoogle,
    userOnline,
    signOut
};

export default userService;
