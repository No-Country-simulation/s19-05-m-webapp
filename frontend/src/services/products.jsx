import axios from 'axios';

// const BASE_URL = import.meta.env.VITE_BASE_URL; utilizar cuando el backend esté listo

const getProducts = async () => {
  	try {
    	const response = await axios.get(`https://run.mocky.io/v3/7914dab8-6f4c-4505-8c66-f787ebebcc43`);
		return response.data;
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

const productService = {
    getProducts,
	getProductById,
};

export default productService;
