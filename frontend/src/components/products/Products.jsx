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

    const handleCard = (id) => {
        navigate(`/product/${id}`);
    };

    return (
        <>
            <div className="products-dropdown">
                <Dropdown options={options.consoleOptions} />
                <Dropdown options={options.categoryOptions}  />
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
