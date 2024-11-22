import productService from "../../services/products";
import useFetch from "../../hooks/useFetch";
import "./products.css";

const imageUrl = "/crash-bandicoot.webp"; // para prueba

const ProductDetail = () => {
    const { data: product } = useFetch(productService.getProductById);

    return (
        <>
            <h1>{product.title}</h1>
            <img src={imageUrl} alt={product.title} />
            <p>{product.description}</p>
            <p>{product.category}</p>
            <p>PC</p>
            <p>Disponible: {product.stock}</p>
            <p>${product.price}</p>
        </>
    );
};
  
export default ProductDetail;
  