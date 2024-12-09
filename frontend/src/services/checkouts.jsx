import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const getCheckouts = async () => {
	try {
		const response = await axios.get(`${BASE_URL}/checkouts`);
		return response.data.data;
	} catch {
		throw new Error("No se pudo cargar historial.");
	}
};

const getCheckout = async (checkoutId) => {
	try {
		const response = await axios.get(`${BASE_URL}/checkouts/${checkoutId}`);
		return response.data.data;
	} catch {
		throw new Error("No se pudo cargar historial.");		
	}
};

const getCheckoutUser = async (userId) => {
	try {
		const response = await axios.get(`${BASE_URL}/checkouts/user/${userId}`);
		return response.data.data;
	} catch {
		throw new Error("No se pudo cargar historial.");		
	}
};

const checkoutService = {
	getCheckouts,
	getCheckout,
	getCheckoutUser
};

export default checkoutService;