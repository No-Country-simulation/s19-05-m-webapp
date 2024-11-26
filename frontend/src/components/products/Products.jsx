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
    const [selectedOptions, setSelectedOptions] = useState({
        console: '',  
        category: '',     
    });
    const navigate = useNavigate();

    const handleCard = (id) => {
        navigate(`/product/${id}`);
    };

    const handleSelectChange = (e) => {
        const { name, value } = e.target;
        setSelectedOptions((prevState) => ({
            ...prevState,
            [name]: value,  
        }));
        console.log(`${name} seleccionada:`, value);  
    };

    const clearFilters = () => {
        setSelectedOptions({
            console: '',
            category: '',
        });
    };

    const isFilterActive = selectedOptions.console || selectedOptions.category;

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
                    options={options.categoryOptions} 
                    value={selectedOptions.category} 
                    onChange={handleSelectChange} 
                    name="category"
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
                    products && products.map((product, index) => (
                        <Card
                            key={index}
                            title={product.title}
                            category={product.category}
                            price={product.price}
                            onClick={() => handleCard(index)} 
                        />
                    ))
                }
            </div>
        </>
    );
};
  
export default Products;
