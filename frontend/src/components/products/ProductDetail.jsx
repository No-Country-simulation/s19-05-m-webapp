import { useParams } from "react-router-dom";
import AddToCartButton from "../AddToCartBtn/AddToCartBtn";
import Loader from "../loader/Loader";
import productService from "../../services/products";
import useFetch from "../../hooks/useFetch";
import "./products.css";

const ProductDetail = () => {
    const { id } = useParams();
    const { data: product, loading, hasError } = useFetch(productService.getProductById, id);
    
    const platform = product?.platforms.map(p => p.name);
    const model = product?.platforms.map(p => p.model);

    return (
        <>
            {
                loading ? (  
                    <Loader className="loader-product-detail" /> 
                ) : hasError ? (  
                    <p className="text-error">{hasError}</p>
                ) : !product ? (  
                    <p className="text-error">No se pudo cargar el detalle del producto.</p>
                ) : (  
                    <div className="product-detail" style={{ backgroundImage: window.innerWidth < 1024 ? 
                        `url(${product.image && product.image.startsWith('https') ? 
                        product.image : '/images/default-image.png'})` : 'none' }}>
                        <div className="overlay" style={{ backgroundImage: window.innerWidth >= 1024 ? 
                            `url(${product.image && product.image.startsWith('https') ? 
                            product.image : '/images/default-image.png'})` : 'none' }}></div>
                        <div className="page-container" style={{ zIndex:'1', width: window.innerWidth >= 1024 ? 
                            '50%' : null, paddingLeft: window.innerWidth >= 1024 ? '60px' : null }}>
                            <div className="product-detail-info">
                                <h1>{product.title}</h1>
                                <div className="detail-section-1">
                                    <p><strong>Plataforma:</strong> {platform}</p>
                                    <p><strong>Género:</strong> {product.genre}</p>
                                    <p><strong>Modelo:</strong> {model}</p>
                                </div>
                                <div className="detail-section-2">
                                    <p className="title"><strong>Descripción</strong></p>
                                    <p>{product.description}</p>
                                </div>
                                <div className="detail-section-3">
                                    <p><strong>Stock:</strong> {product.stock} unidades</p>
                                    <p>${product.price}</p>
                                </div>
                                <AddToCartButton product={product} />
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    );
};
  
export default ProductDetail;
