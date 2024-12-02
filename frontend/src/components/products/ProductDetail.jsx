import { useParams } from "react-router-dom";
import productService from "../../services/products";
import useFetch from "../../hooks/useFetch";
import "./products.css";
import AddToCartButton from "../AddToCartBtn/AddToCartBtn";

const imageUrl = "/crash-bandicoot.webp"; // para prueba

const ProductDetail = () => {
    const { id } = useParams();
    const { data: product, loading } = useFetch(productService.getProductById, id);

    return (
        <>
            {
                loading ? <p>Cargando...</p> 
                : product && (
                    <>
                        <h1>{product.title}</h1>
                        <img src={imageUrl} alt={product.title} />
                        <p>{product.description}</p>
                        <p>{product.category}</p>
                        <p>Nintendo</p>
                        <p>Disponible: {product.stock}</p>
                        <p>${product.price}</p>
                        <AddToCartButton product={product}/>
                        <p>Comprar</p>
                    </>
                ) 
            }   
        </>
    );
};

export default ProductDetail;
