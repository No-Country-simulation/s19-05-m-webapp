import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const createUser = async (userData, setMessage) => {
    try {
        const response = await axios.post(`${BASE_URL}users/`, userData);
        console.log('Creación de usuario exitosa', response.data);
        setMessage("¡Te has registrado exitosamente!");
    } catch (err) {
        console.error('Error:', err);
        const errorMessage = err.response?.data?.message || "Hubo un problema con el registro. Inténtalo nuevamente.";
        console.log(errorMessage);
        if (errorMessage == "User email already exists.") {
            setMessage("El correo ya está en uso.");
        }else {
            setMessage("Ocurrió un error.");
        }
    }
};

export default createUser;
