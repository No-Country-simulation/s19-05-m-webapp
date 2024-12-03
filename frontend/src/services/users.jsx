import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const getUsers = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/users`);
        return response.data.data;
    } catch {
        throw new Error("No se pudieron cargar los usuarios. Inténtalo de nuevo más tarde.");
    }
};

const getUserById = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/users/${id}`);
        return response.data.data;
    } catch {
        throw new Error("No se pudo obtener información del usuario. Inténtalo de nuevo más tarde.");
    }
};

const createUser = async (newUser) => {
	try {
		const response = await axios.post(`${BASE_URL}/users`, newUser );
		return response.data.message;
	} catch {
		throw new Error("No se pudo crear el nuevo usuario. Inténtalo de nuevo más tarde.");
	}
}

const editUser = async (id, updateUser) => {
	try {
		const response = await axios.put(`${BASE_URL}/users/${id}`, updateUser);
		return response.data.success;
	} catch {
		throw new Error("No se pudo editar el usuario. Inténtalo de nuevo más tarde.");
	}
}

const deleteUser = async (id, deleteUser) => {
	try {
		const response = await axios.delete(`${BASE_URL}/users/${id}`, deleteUser);
		return response.data.success;
	} catch {
		throw new Error("No se pudo editar el usuario. Inténtalo de nuevo más tarde.");
	}
}

const usersService = {
	getUsers,
	getUserById,
    createUser,
    editUser,
    deleteUser
};

export default usersService;