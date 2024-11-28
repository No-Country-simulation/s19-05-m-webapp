import { PayPalButtons } from "@paypal/react-paypal-js";
import { useNavigate } from "react-router-dom";

export const Payment = ({ onGoBack, products, totalAmount }) => {
  const navigate = useNavigate();
  return (
    <div>
      {/* Sección Resumen */}
      <h2>Resumen</h2>
      <div className="summary-container">
        {products.map((product, index) => (
          <div key={index} className="summary-item">
            <p>
              {product.name} ({product.platform}) - {product.quantity}x{" "}
              {product.price.toFixed(2)}$
            </p>
          </div>
        ))}
        <hr />
        <p>
          <strong>Total:</strong> {totalAmount.toFixed(2)}$
        </p>
      </div>

      {/* Sección Total */}
      <div className="total-container">
        <p className="total-item">
          <span>IVA (0%):</span> <span>0$</span>
        </p>
        <p className="total-item total-highlight">
          <span>Total:</span> <span>{totalAmount.toFixed(2)}$</span>
        </p>
        <div className="pay-button">
          <PayPalButtons
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: totalAmount.toFixed(2),
                    },
                  },
                ],
              });
            }}
            onApprove={(data, actions) => {
              return actions.order.capture().then((details) => {
                alert(
                  `Transacción completada por ${details.payer.name.given_name}`
                );
                navigate("/");
              });
            }}
          />
        </div>
        <p className="terms">
          Haciendo clic en &quot;Pagar&quot; reconozco haber aceptado los{" "}
          <a href="#terms">términos y condiciones</a>, y la{" "}
          <a href="#privacy">política de privacidad</a>.
        </p>
      </div>
      <button className="back-button" onClick={onGoBack}>Regresar</button>
    </div>
  );
};
