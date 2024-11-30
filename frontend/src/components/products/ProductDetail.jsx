import { useParams } from "react-router-dom";
import AddToCartButton from "../AddToCartBtn/AddToCartBtn";
import productService from "../../services/products";
import useFetch from "../../hooks/useFetch";
import "./products.css";

const imageUrl = "/hero-img.png"; // para prueba

const ProductDetail = () => {
    const { id } = useParams();
    const { data: product, loading } = useFetch(productService.getProductById, id);

    const platform = product?.platforms.map(p => p.name);
    const model = product?.platforms.map(p => p.model);

    return (
        <>
            <div className="product-detail" style={{ backgroundImage: window.innerWidth < 1024 ? 
                `url(${imageUrl})` : 'none' }}>
                <div className="overlay" style={{ backgroundImage: window.innerWidth >= 1024 ? 
                    `url(${imageUrl})` : 'none' }}></div>
                <div className="page-container" style={{ zIndex:'1', width: window.innerWidth >= 1024 ?
                    '50%' : null, paddingLeft: window.innerWidth >= 1024 ? '60px' : null }}>
                    <div className="product-detail-info">
                        {
                            loading ? <p>Cargando...</p> 
                            : product && (
                                <>
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
                                        <p><strong>Precio:</strong> ${product.price}</p>
                                    </div>
                                    <AddToCartButton product={product} />
                                </>
                            ) 
                        }  
                    </div>
                </div>
            </div>
        </>
    );
};
  
export default ProductDetail;
  