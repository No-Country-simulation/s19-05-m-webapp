import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const getUsers = async () => {
	try {
		const response = await axios.get(`${BASE_URL}/users`);
		return response.data.data;
	} catch {
		throw new Error("No se pudo cargar el listado de usuarios. Inténtalo de nuevo más tarde.");
	}
};

const updateUser = async (id, updateUser) => {
	try {
		const response = await axios.put(`${BASE_URL}/users/${id}`, updateUser);
		return response.data.data;
	} catch {
		throw new Error("No se pudo actualizar el usuario. Inténtalo de nuevo más tarde.");
	}
};


const deleteUser = async (id) => {
	try {
		const response = await axios.delete(`${BASE_URL}/users/${id}`);
		return response.data.success;
	} catch {
		throw new Error("No se pudo eliminar el usuario. Inténtalo de nuevo más tarde.");
	}
}

const userService = {
    getUsers,
	updateUser,
	deleteUser
};

export default userService;
