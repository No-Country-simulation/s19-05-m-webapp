import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const getCart = async (userId) => {
	try {
		const response = await axios.get(`${BASE_URL}shopping`, {
			params: { user: userId }, 
		});
		return response.data.data; 
	} catch {
		throw new Error("No se pudo cargar el carrito. Inténtalo de nuevo más tarde.");
	}
};

const createCart = async (userId) => {
	try {
		const response = await axios.post(`${BASE_URL}shopping`, { user: userId });
		return response.data.message; 
	} catch {
		throw new Error("No se pudo crear el carrito. Inténtalo de nuevo más tarde.");
	}
};

const addOrUpdateProductInCart = async (userId, productId, quantity) => {
	console.log({userId, productId, quantity});
	try {
		const response = await axios.post(`${BASE_URL}shopping`, {user_id:userId, products_id:productId, quantity },
			{
                headers: {
                    'Content-Type': 'application/json',
                },
			}
		);
		console.error("Error al actualizar el carrito:", error.response?.data || error.message);
		return response.data.message; 
	} catch {
		throw new Error("No se pudo actualizar el producto en el carrito. Inténtalo de nuevo más tarde.");
	}
};

const removeProductFromCart = async (userId, productId) => {
	try {
		const response = await axios.delete(`${BASE_URL}shopping/${userId}/${productId}`);
		return response.data.message;
	} catch {
		throw new Error("No se pudo eliminar el producto del carrito. Inténtalo de nuevo más tarde.");
	}
};

const shoppingCartService = {
	getCart,
	createCart,
	addOrUpdateProductInCart,
	removeProductFromCart,
};

export default shoppingCartService;
