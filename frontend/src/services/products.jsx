import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const getProducts = async () => {
	try {
		const response = await axios.get(`${BASE_URL}/products`);
		return response.data.data;
	} catch {
		throw new Error("No se pudo cargar los productos. Inténtalo de nuevo más tarde.");
	}
};

const getProductById = async (id) => {
	try {
	  	const response = await axios.get(`${BASE_URL}/products/${id}`);
	  	return response.data.data;
	} catch {
		throw new Error("No se pudo obtener información del producto. Inténtalo de nuevo más tarde.");
	}
};

const getProductsByGenre = async (genre) => {
	try {
		const response = await axios.get(`${BASE_URL}/products/genre/${genre}`);
		return response.data.data;
	} catch {
		throw new Error("No se pudo cargar los productos por género. Inténtalo de nuevo más tarde.");
	}
}

const getProductsByPlatform = async (platform) => {
	try {
		const response = await axios.get(`${BASE_URL}/products/platform/${platform}`);
		return response.data.data;
	} catch {
		throw new Error("No se pudo cargar los productos por plataforma. Inténtalo de nuevo más tarde.");
	}
}

const createProduct = async (newProduct) => {
	try {
		const response = await axios.post(`${BASE_URL}/products`, newProduct );
		return response.data.message;
	} catch {
		throw new Error("No se pudo crear el producto. Inténtalo de nuevo más tarde.");
	}
}

const editProduct = async (id, updateProduct) => {
	try {
		const response = await axios.put(`${BASE_URL}/products/${id}`, updateProduct);
		return response.data.success;
	} catch {
		throw new Error("No se pudo editar el producto. Inténtalo de nuevo más tarde.");
	}
}

const productService = {
	getProducts,
	getProductById,
	getProductsByGenre,
	getProductsByPlatform,
	createProduct,
	editProduct
};

export default productService;
