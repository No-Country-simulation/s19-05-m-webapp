import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const getProducts = async () => {
  	try {
    	const response = await axios.get(`${BASE_URL}/`);
    	return response.data;
  	} catch (error) {
    	console.log(error);
  	}
};

const productService = {
    getProducts,
	// colocar los demás aquí
};

export default productService;
