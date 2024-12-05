import useFetch from "../../hooks/useFetch";
import productService from "../../services/products";
import { useNavigate } from "react-router-dom";
import Card from "../card/Card";
import "./trends.css";

const Trends = () => {
  const { data: products } = useFetch(productService.getProducts);
  const navigate = useNavigate();

  const handleCard = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <>
      <h2 className="subtitle">Tendencias</h2>
      <div className="products-container">
        {products &&
          products
            .slice(-4)
            .reverse()
            .map((product, index) => (
              <Card
                key={index}
                title={product.title}
                category={product.category}
                price={product.price}
                onClick={() => handleCard(index)}
              />
            ))}
      </div>
    </>
  );
};

export default Trends;
