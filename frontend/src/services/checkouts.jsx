import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const getCheckouts = async () => {
	try {
		const response = await axios.get(`${BASE_URL}checkouts`);
		return response.data.data;
	} catch {
		throw new Error("No se pudo cargar el historial de ordenes. Inténtalo de nuevo más tarde.");
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

const checkoutService = {
	getCheckouts,
	getCheckout,
};

export default checkoutService;
