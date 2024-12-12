export const Checkout = ({ onNext, products, totalAmount }) => {
  return (
    <div className="container">
      <h2>Cesta</h2>
      {products.map((product, index) => (
        <div key={index} className="summary-item">
          <p>
            Juego: {product.title} {/* ({product.platform}) */} - $
            {product.price.toFixed(2)} {" "}
            &#40;{product.quantity}&#41;
          </p>
        </div>
      ))}
      <hr />
      <p>
        <strong>Total:</strong> ${totalAmount.toFixed(2)}
      </p>
      <button id="boton-submit" style={{ margin: "0.8rem 0" }} onClick={onNext}>
        Siguiente
      </button>
    </div>
  );
};
