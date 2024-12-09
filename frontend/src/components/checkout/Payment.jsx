import { useSelector } from "react-redux";
import { Link, redirect, useNavigate } from "react-router-dom";
import { PaypalIcon } from "./PaypalIcon";
import Loader from "../loader/Loader";
import { useState } from "react";
import checkoutService from "../../services/checkouts";
import { toast, Toaster } from "sonner";

export const Payment = ({
  onGoBack,
  products,
  totalAmount,
  paymentUrl,
  paymentId,
  isLoading,
  error,
}) => {
  const shipping = useSelector((state) => state.Shipping);
  const [isPopupOpen, setIsPopupOpen] = useState(false);  

  const handlePaypalClick = () => {
    console.log("paymentId", paymentId);
    if (paymentUrl) {
      const popup = window.open(
        paymentUrl,
        "PaypalPayment",
        "width=800,height=600"
      );

      if (popup) {
        setIsPopupOpen(true);

        const interval = setInterval(async () => {
          if (popup.closed) {
            clearInterval(interval);
            setIsPopupOpen(false);
            try {
              const resp = await checkoutService.getCheckout(paymentId);
              const check = resp[0];

              if (check.status === "PAID") {
                toast.success("Compra realizada con éxito");
                
              } else if (check.status === "DECLINED") {
                toast.error("Compra rechazada");
              }

            } catch (err) {
              console.error(err);
              toast.error("Ocurrió un error al verificar el estado del pago");
            }
          }
        }, 500);
      } else {
        toast.error("No se pudo abrir la ventana emergente.");
      }
    } else {
      toast.error("No se encontró la URL de pago.");
    }
  };

  return (
    <div className="container">
      <Toaster richColors position="bottom-center" />
      {/* Overlay que cubre la página */}
      {isPopupOpen && <div className="overlay"></div>}

      <div className={`checkout-box ${isPopupOpen ? "disabled" : ""}`}>
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
                <button
                  className="next-button"
                  onClick={handlePaypalClick}
                  disabled={isPopupOpen}
                >
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
      <button
        className="back-button btn-box"
        onClick={onGoBack}
        disabled={isPopupOpen}
      >
        Regresar
      </button>
    </div>
  );
};
