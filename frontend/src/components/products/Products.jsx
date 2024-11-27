import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../card/Card";
import Dropdown from "../dropdown/Dropdown";
import productService from "../../services/products";
import useFetch from "../../hooks/useFetch";
import options from '../../utils/options';
import "./products.css";

const Products = () => {
    const { data: products } = useFetch(productService.getProducts);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const navigate = useNavigate();
    const [selectedOptions, setSelectedOptions] = useState({ platform: '', genre: '', model: '' });
    const { data: productsByGenre } = useFetch(
        selectedOptions.genre ? productService.getProductsByGenre : null,
        selectedOptions.genre
    );
    const { data: productsByPlatform } = useFetch(
        selectedOptions.platform ? productService.getProductsByPlatform : null,
        selectedOptions.platform
    );

    const handleCard = (id) => {
        navigate(`/product/${id}`);
    };

    const handleSelectChange = (e) => {
        const { name, value } = e.target;
        setSelectedOptions((prevState) => ({
            ...prevState,
            [name]: value,  
        })); 
    };

    useEffect(() => {
        let productsToShow = products;

        if (selectedOptions.genre && productsByGenre) {
            productsToShow = productsByGenre;
        }

        if (selectedOptions.platform && productsToShow) {
            productsToShow = productsToShow.filter(product => 
                product.platforms.some(platform => platform.name === selectedOptions.platform)
            );
        }

        if (selectedOptions.model && productsToShow) {
            productsToShow = productsToShow.filter((product) =>
                product.platforms.some(platform => platform.model === selectedOptions.model)
            );
        }

        setFilteredProducts(productsToShow || []);
    }, [selectedOptions, products, productsByGenre, productsByPlatform]);

    const clearFilters = () => {
        setSelectedOptions({ platform: '', genre: '', model: '' });
    };

    const isFilterActive = selectedOptions.platform || selectedOptions.genre;

    return (
        <>
            <div className="products-dropdown">
                <Dropdown 
                    options={options.platformOptions} 
                    value={selectedOptions.platform} 
                    onChange={handleSelectChange} 
                    name="platform" 
                />
                <Dropdown 
                    options={options.genreOptions} 
                    value={selectedOptions.genre} 
                    onChange={handleSelectChange} 
                    name="genre"
                />
                {
                    selectedOptions.platform && (
                        <Dropdown 
                            options={options.modelOptions} 
                            value={selectedOptions.model} 
                            onChange={handleSelectChange} 
                            name="model"
                        />
                    )
                }
                {
                    isFilterActive && (
                        <button className="clear-filters-btn" onClick={clearFilters}>
                            Borrar filtros
                        </button>
                    )
                }
            </div>
            <h1>Productos</h1>
            <div className="products-container">
                {
                    filteredProducts && filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                            <Card
                                key={product.id_product}
                                title={product.title}
                                genre={product.genre}
                                price={product.price}
                                onClick={() => handleCard(product.id_product)} 
                            />
                        ))
                    ) : (
                        <p>No se encontraron productos que coincidan con los filtros seleccionados.</p>
                    )
                }
            </div>
        </>
    );
};
  
export default Products;
