import Card from "../card/Card";
import productService from "../../services/products";
import useFetch from "../../hooks/useFetch";
import "./products.css";

const Products = () => {
    const { data: products } = useFetch(productService.getProducts);

    return (
        <>
           <h1>Productos</h1>
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
  