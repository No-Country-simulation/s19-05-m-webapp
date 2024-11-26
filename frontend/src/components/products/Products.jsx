import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../card/Card";
import Dropdown from "../dropdown/Dropdown";
import productService from "../../services/products";
import useFetch from "../../hooks/useFetch";
import options from '../../utils/options';
import "./products.css";

const Products = () => {
    const { data: products } = useFetch(productService.getProducts);
    const navigate = useNavigate();
    const [selectedOptions, setSelectedOptions] = useState({ console: '', genre: '' });
    const { data: productsByGenre } = useFetch(
        selectedOptions.genre ? productService.getProductsByGenre : null,
        selectedOptions.genre
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

    const clearFilters = () => {
        setSelectedOptions({
            console: '',
            genre: '',
        });
    };

    const isFilterActive = selectedOptions.console || selectedOptions.genre;

    const productsToShow = selectedOptions.genre ? productsByGenre : products;

    return (
        <>
            <div className="products-dropdown">
                <Dropdown 
                    options={options.consoleOptions} 
                    value={selectedOptions.console} 
                    onChange={handleSelectChange} 
                    name="console" 
                />
                <Dropdown 
                    options={options.genreOptions} 
                    value={selectedOptions.genre} 
                    onChange={handleSelectChange} 
                    name="genre"
                />
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
                    productsToShow && productsToShow.length > 0 ? (
                        productsToShow.map((product) => (
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
