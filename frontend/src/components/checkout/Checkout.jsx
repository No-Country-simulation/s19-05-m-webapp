export const Checkout = ({ onNext, products, totalAmount }) => {
  return (
    <div>
      <h2>Cesta</h2>
      {products.map((product, index) => (
        <div key={index} className="summary-item">
          <p>
            {product.title} {/* ({product.platform}) */} - {product.quantity}x{" "}
            {product.price.toFixed(2)}$
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
    </div>
  );
};
