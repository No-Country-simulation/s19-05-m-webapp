import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { PaypalIcon } from "./PaypalIcon";
import Loader from "../loader/Loader";

export const Payment = ({
  onGoBack,
  products,
  totalAmount,
  paymentUrl,
  isLoading,
  error,
}) => {
  const shipping = useSelector((state) => state.Shipping);

  const handlePaypalClick = () => {
    if (paymentUrl) {
      window.location.href = paymentUrl;
    }
  };

  return (
    <div className="container">
      <div className="checkout-box">
        {/* Sección Resumen */}
        <div className="resume">
          <h2>Resumen</h2>
          <div className="summary-item">
            <p>Nombre: {shipping.name}</p>
          </div>
          <div className="summary-item">
            <p>Dirección: {shipping.address}</p>
          </div>
          <div className="summary-item">
            <p>Ciudad: {shipping.city}</p>
          </div>
          <div className="summary-item">
            <p>Código postal: {shipping.postalCode}</p>
          </div>
          <div className="summary-item">
            <p>País: {shipping.country}</p>
          </div>
        </div>
        <div className="shop">
          {/* Sección Compra */}
          <h2>Compra</h2>
          {products.map((product, index) => (
            <div key={index} className="summary-item">
              <p>
                Juego: {product.title} {/* ({product.platform}) */} - $
                {product.price.toFixed(2)} {""}
                &#40;{product.quantity}&#41;
              </p>
            </div>
          ))}
          <hr />
          <p>
            <strong>Total:</strong> {totalAmount.toFixed(2)}$
          </p>

          {/* Sección Total */}
          <div className="total-container">
            <h2 style={{ textAlign: "left" }}>Medio de pago</h2>
            <div className="pay-button">
              {isLoading ? (
                <Loader />
              ) : error ? (
                <p className="error-message">{error}</p>
              ) : (
                <button className="next-button" onClick={handlePaypalClick}>
                  <PaypalIcon />
                  <span>Paypal</span>
                </button>
              )}
            </div>
            <p className="terms">
              Haciendo clic en &quot;Paypal&quot; reconozco haber aceptado los{" "}
              <Link to={"/terms"} target="_blank" rel="noopener noreferrer">
                términos y condiciones
              </Link>
              , y la{" "}
              <Link to={"/politics"} target="_blank" rel="noopener noreferrer">
                política de privacidad
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
      <button className="back-button btn-box" onClick={onGoBack}>
        Regresar
      </button>
    </div>
  );
};
