import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const getProducts = async () => {
  	try {
    	const response = await axios.get(`${BASE_URL}/products`);
		return response.data.data;
  	} catch (error) {
    	console.log(error);
  	}
};

const getProductById = async (id) => {
	try {
	  const response = await axios.get(`https://apimocha.com/checkpointzone/products/${id}`);
	  return response.data;
	} catch (error) {
	  console.log(error);
	}
};

const getProductsByGenre = async (genre) => {
	try {
		const response = await axios.get(`${BASE_URL}/products/genre/${genre}`);
		return response.data.data;
  	} catch (error) {
		console.log(error);
  	}
}

const getProductsByPlatform = async (platform) => {
	try {
		const response = await axios.get(`${BASE_URL}/products/platform/${platform}`);
		return response.data.data;
  	} catch (error) {
		console.log(error);
  	}
}

const productService = {
    getProducts,
	getProductById,
	getProductsByGenre,
	getProductsByPlatform,
};

export default productService;
