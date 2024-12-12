import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { PaypalIcon } from "./PaypalIcon";
import Loader from "../loader/Loader";
import { useEffect, useState } from "react";
import checkoutService from "../../services/checkouts";
import { toast, Toaster } from "sonner";
import shoppingService from "../../services/shopping";

export const Payment = ({ onGoBack, products, totalAmount }) => {
  const shipping = useSelector((state) => state.Shipping);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(""); // Estado para el estado del pago
  const [isLoading, setIsLoading] = useState(true);
  const [paymentUrl, setPaymentUrl] = useState("");
  const [paymentId, setPaymentId] = useState("");
  const [error, setError] = useState("");
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const generatePaymentUrl = async () => {
      try {
        setIsLoading(true);
        setError("");

        // Revisar si ya existe en localStorage
        const storedPayment = JSON.parse(localStorage.getItem("payment"));
        if (storedPayment?.url && storedPayment?.id) {
          setPaymentUrl(storedPayment.url);
          setPaymentId(storedPayment.id);
          setIsLoading(false);
          return;
        }

        const localUser = JSON.parse(localStorage.getItem("user") || "{}");
        if (!localUser?.id_users) {
          throw new Error("El usuario no tiene un ID válido.");
        }

        // Llamada al servicio para obtener el ID de pago
        const response = await shoppingService.patchShopping(
          localUser.id_users
        );

        const paymentId = response.id || response[0].id_checkout;

        if (paymentId) {
          // Generar la URL a partir del ID
          const generatedUrl = `https://www.sandbox.paypal.com/checkoutnow?token=${paymentId}`;
          setPaymentUrl(generatedUrl);
          setPaymentId(paymentId);

          // Guardar en el almacenamiento local para referencia futura
          localStorage.setItem(
            "payment",
            JSON.stringify({ url: generatedUrl, id: paymentId })
          );
        } else {
          throw new Error("No se pudo generar el ID de pago.");
        }
      } catch (error) {
        console.error("Error al generar la URL de pago:", error);
        setError(
          "Ocurrió un error al generar el enlace de pago. Por favor, inténtelo más tarde."
        );
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      generatePaymentUrl();
    }
  }, [user]);

  const handlePaypalClick = () => {
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
                setPaymentStatus("paid");
                toast.success("Compra realizada con éxito");
                localStorage.removeItem("payment");
              } else if (check.status === "DECLINED") {
                setPaymentStatus("cancelled");
                toast.error("Compra rechazada");
                localStorage.removeItem("payment");
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

  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className="container">
      <Toaster richColors position="bottom-center" />
      {isPopupOpen && <div className="overlay"></div>}

      <div className={`checkout-box ${isPopupOpen ? "disabled" : ""}`}>
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
          <h2>Compra</h2>
          {products.map((product, index) => (
            <div key={index} className="summary-item">
              <p>
                Juego: {product.title} - ${product.price.toFixed(2)} &#40;
                {product.quantity}&#41;
              </p>
            </div>
          ))}
          <hr />
          <p>
            <strong>Total:</strong> {totalAmount.toFixed(2)}$
          </p>

          <div className="total-container">
            <h2 style={{ textAlign: "left" }}>Medio de pago</h2>
            <div className="pay-button">
              {isLoading ? (
                <Loader />
              ) : error ? (
                <p className="error-message">{error}</p>
              ) : paymentStatus === "paid" ? (
                <div className="paid-section">
                  <p className="success-message">Pagado</p>
                  <Link to="/" className="return-button">
                    Regresar a la tienda
                  </Link>
                </div>
              ) : paymentStatus === "cancelled" ? (
                <div className="cancelled-section">
                  <p className="error-message">Cancelado</p>
                  <button className="next-button" onClick={handleRetry}>
                    Reintentar
                  </button>
                </div>
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

      {paymentStatus !== "paid" && paymentStatus !== "cancelled" && (
        <button
          className="back-button btn-box"
          onClick={onGoBack}
          disabled={isPopupOpen}
        >
          Regresar
        </button>
      )}
    </div>
  );
};
