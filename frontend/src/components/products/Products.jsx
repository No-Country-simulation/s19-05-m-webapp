import { useNavigate } from "react-router-dom";
import Card from "../card/Card";
import Dropdown from "../dropdown/Dropdown";
import InfiniteScroll from "../infiniteScroll/InfiniteScroll";
import Loader from "../loader/Loader";
import productService from "../../services/products";
import useFetch from "../../hooks/useFetch";
import useReset from "../../hooks/useReset";
import usePagination from "../../hooks/usePagination";
import options from '../../utils/options';
import useFilteredProducts from "../../hooks/useFilteredProducts";
import "./products.css";

const Products = () => {
    const { data: products, loading: productsLoading, hasError: productsError } = useFetch(productService.getProducts);
    const { page, loading: paginationLoading, loadMore, resetPagination } = usePagination();
    const navigate = useNavigate();

    const { values: selectedOptions, handleChange, reset } = useReset(
        { platform: '', genre: '', model: '' }
    );
    
    const { data: productsByGenre, loading: genreLoading, hasError: genreError } = useFetch(
        selectedOptions.genre ? productService.getProductsByGenre : null,
        selectedOptions.genre
    );

    const { data: productsByPlatform, loading: platformLoading, hasError : platformError } = useFetch(
        selectedOptions.platform ? productService.getProductsByPlatform : null,
        selectedOptions.platform
    );

    const filteredProducts = useFilteredProducts(selectedOptions, products, 
        productsByGenre, productsByPlatform, page,
    );

    const handleCard = (id) => {
        navigate(`/product/${id}`);
    };

    const isFilterActive = selectedOptions.platform || selectedOptions.genre;

    return (
        <>
            <div className="products-dropdown">
                <Dropdown 
                    options={options.platformOptions} 
                    value={selectedOptions.platform} 
                    onChange={handleChange} 
                    name="platform" 
                />
                <Dropdown 
                    options={options.genreOptions} 
                    value={selectedOptions.genre} 
                    onChange={handleChange} 
                    name="genre"
                />
                {
                    selectedOptions.platform && productsByPlatform && (
                        <Dropdown 
                            options={options.modelOptions} 
                            value={selectedOptions.model} 
                            onChange={handleChange} 
                            name="model"
                        />
                    )
                }
                {
                    isFilterActive && (
                        <button className="clear-filters-btn" 
                            onClick={() => { reset(); resetPagination(); }}>
                            Borrar filtros
                        </button>
                    )
                }
            </div>
            <h1>Productos</h1>
            <div className="products-container">
                {
                    productsError || genreError || platformError ? (
                        <p>{ productsError || genreError || platformError }</p>
                    ) : productsLoading || genreLoading || platformLoading ? (
                        <Loader /> 
                    ) : filteredProducts && filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                            <Card
                                key={product.id_product}
                                title={product.title}
                                genre={product.genre}
                                price={product.price}
                                onClick={() => handleCard(product.id_product)} 
                            />
                        ))
                    ) : (isFilterActive && filteredProducts.length === 0) ? (
                        <p>No se encontraron productos que coincidan con los filtros seleccionados.</p>
                    ) : null
                }
            </div>
            <InfiniteScroll 
                onLoadMore={loadMore} 
                hasMore={filteredProducts?.length < products?.length} 
                loading={paginationLoading} 
            />
            {
                paginationLoading && <Loader />
            }
        </>
    );
};
  
export default Products;
