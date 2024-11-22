import Card from "../card/Card";
import Dropdown from "../dropdown/Dropdown";
import productService from "../../services/products";
import useFetch from "../../hooks/useFetch";
import options from '../../utils/options';
import "./products.css";

const Products = () => {
    const { data: products } = useFetch(productService.getProducts);

    return (
        <>
            <h1>Productos</h1>
            <Dropdown options={options.consoleOptions} />
            <Dropdown options={options.categoryOptions}  />
            <div className="products-container">
                {
                    products && products.map((product, index) => (
                        <Card
                            key={index}
                            title={product.title}
                            category={product.category}
                            price={product.price}
                        />
                    ))
                }
            </div>
        </>
    );
};
  
export default Products;
  