import { useNavigate } from "react-router-dom";

export const Checkout = ({ onNext, products, totalAmount }) => {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Cesta</h2>
      {products.length > 0 ? (
        <>
          {products.map((product, index) => (
            <div key={index} className="summary-item">
              <p>
                {product.title} {/* ({product.platform}) */} -{" "}
                {product.quantity}x {product.price.toFixed(2)}$
              </p>
            </div>
          ))}
          <hr />
          <p>
            <strong>Total:</strong> {totalAmount.toFixed(2)}$
          </p>
          <button className="next-button" onClick={onNext}>
            Siguiente
          </button>
        </>
      ) : (
        <>
          <h2>No hay productos en la cesta.</h2>
          <button className="back-button" onClick={() => navigate("/")}>
            Volver a la tienda
          </button>
        </>
      )}
    </div>
  );
};
