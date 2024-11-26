import axios from 'axios';

// const BASE_URL = import.meta.env.VITE_BASE_URL; utilizar cuando el backend esté listo
const mockProducts = [
	{
		id: "1",
		title: "Crash Bandicoot",
		description: "Un emocionante juego de plataformas.",
		category: "Aventura",
		price: 49.99,
		stock: 10,
		image: "/crash-bandicoot.webp"
	},
	{
		id: "2",
		title: "Mario Kart",
		description: "Carreras llenas de acción con tus personajes favoritos.",
		category: "Carreras",
		price: 59.99,
		stock: 8,
		image: "/mario-kart.webp"
	},
	{
		id: "3",
		title: "The Legend of Zelda",
		description: "Explora un mundo lleno de secretos y aventuras.",
		category: "Aventura",
		price: 69.99,
		stock: 5,
		image: "/zelda.webp"
	}
];

const getProducts = async () => {
	try {
		const response = await axios.get(`https://run.mocky.io/v3/e1e64f1b-c530-4fe8-81b6-b242d4c0f4f7`);
		return response.data;
	} catch (error) {
		console.log(error);
	}
};

const getProductById = async (id) => {
	// Simulación local para pruebas
	return new Promise((resolve, reject) => {
		const product = mockProducts.find((p) => p.id === id);
		if (product) {
			resolve(product);
		} else {
			reject("Producto no encontrado");
		}
	});
};


// const getProductById = async (id) => {
// 	try {
// 		const response = await axios.get(`https://apimocha.com/checkpointzone/products/${id}`);
// 		return response.data;
// 	} catch (error) {
// 		console.log(error);
// 	}
// };

const productService = {
	getProducts,
	getProductById,
};

export default productService;
