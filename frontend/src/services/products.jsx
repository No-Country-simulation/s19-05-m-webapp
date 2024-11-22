import axios from 'axios';

// const BASE_URL = import.meta.env.VITE_BASE_URL; utilizar cuando el backend esté listo

const getProducts = async () => {
  	try {
    	const response = await axios.get(`https://run.mocky.io/v3/e1e64f1b-c530-4fe8-81b6-b242d4c0f4f7`);
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
