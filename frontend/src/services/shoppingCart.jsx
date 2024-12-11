import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const shoppingCartService = {

	getCart: async (user_id) => {
		try {
			const response = await axios.get(`${BASE_URL}/shopping/user/${user_id}`)
			return response.data.data;
		} catch (error) {
			console.error("Error al cargar el carrito:", error.response?.data || error.message);
			throw new Error("No se pudo cargar el carrito. Inténtalo de nuevo más tarde.");
		}
	},
	
	createCart: async (user_id, products_id, quantity) => {
		try {
			const response = await axios.post(`${BASE_URL}/shopping`, { user_id, products_id, quantity});
			return response.data.message;
		} catch (error){
			console.error("Error al crear el carrito:", error.response?.data || error.message);
			throw new Error("No se pudo crear el carrito. Inténtalo de nuevo más tarde.");
		}
	},

	addOrUpdateProductInCart: async (user_id, products_id) => {
		console.log({ user_id, products_id});
		try {
			const response = await axios.put(`${BASE_URL}/shopping/${user_id}/${products_id}`,
				{
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);
			return response.data.message;
		} catch (error){
			console.error("Error al actualizar el carrito:", error.response?.data || error.message);
			throw new Error("No se pudo actualizar el producto en el carrito. Inténtalo de nuevo más tarde.");
		}
	},

	removeProductFromCart: async (user_id, products_id) => {
		try {
			const response = await axios.delete(`${BASE_URL}/shopping/${user_id}/${products_id}`);
			return response.data.message;
		} catch (error){
			console.error("Error al eliminar el producto del carrito:", error.response?.data || error.message);
			throw new Error("No se pudo eliminar el producto del carrito. Inténtalo de nuevo más tarde.");
		}
	}
};

export default shoppingCartService;
