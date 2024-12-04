import { PayPalButtons } from "@paypal/react-paypal-js";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export const Payment = ({ onGoBack, products, totalAmount }) => {
  const navigate = useNavigate();
  const shipping = useSelector((state) => state.Shipping);

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
              <button className="next-button">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 20 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M19.4427 8.85957C19.594 9.56332 19.5752 10.4171 19.3927 11.4233C18.6652 15.1458 16.2965 17.0058 12.289 17.0058H11.7365C11.5323 17.0046 11.3348 17.0784 11.1815 17.2133C11.0226 17.3509 10.9169 17.5397 10.8827 17.7471L10.8315 17.9833L10.1402 22.3321L10.114 22.5208C10.0783 22.7296 9.96871 22.9186 9.80522 23.0533C9.65096 23.1891 9.45194 23.263 9.24647 23.2608H6.09272C6.01378 23.265 5.935 23.2501 5.863 23.2175C5.791 23.1848 5.72789 23.1354 5.67897 23.0733C5.62928 23.0099 5.59357 22.9367 5.57418 22.8585C5.55479 22.7803 5.55216 22.6989 5.56647 22.6196C5.64272 22.1533 5.75147 21.4471 5.90022 20.5083C6.04647 19.5708 6.15772 18.8658 6.23397 18.3971C6.31022 17.9283 6.42147 17.2246 6.57397 16.2908C6.72522 15.3558 6.83897 14.6533 6.91272 14.1846C6.95397 13.8746 7.13647 13.7208 7.45397 13.7208H9.09897C10.2152 13.7371 11.2015 13.6496 12.0677 13.4571C13.5327 13.1296 14.7352 12.5271 15.6752 11.6458C16.5315 10.8496 17.179 9.81832 17.6252 8.55457C17.8277 7.96707 17.9715 7.40832 18.0652 6.88207C18.0727 6.83082 18.0827 6.79957 18.0965 6.78957C18.1065 6.77582 18.124 6.77207 18.1402 6.77582C18.1674 6.78793 18.1933 6.80258 18.2177 6.81957C18.8727 7.31707 19.2852 7.99582 19.4427 8.85957ZM17.2827 5.31457C17.2827 6.21082 17.0902 7.19957 16.7015 8.28207C16.0302 10.2346 14.7677 11.5546 12.9052 12.2421C11.9577 12.5783 10.9027 12.7521 9.73647 12.7733C9.73647 12.7808 9.36022 12.7821 8.60647 12.7821L7.47772 12.7733C6.63772 12.7733 6.14397 13.1733 5.99397 13.9783C5.97772 14.0446 5.62147 16.2658 4.92522 20.6396C4.91522 20.7221 4.86522 20.7671 4.77397 20.7671H1.06772C0.980371 20.7689 0.893705 20.7514 0.813951 20.7157C0.734196 20.68 0.663336 20.6271 0.606467 20.5608C0.54746 20.4956 0.5039 20.4178 0.479015 20.3335C0.454131 20.2491 0.44856 20.1602 0.462716 20.0733L3.37772 1.57957C3.41505 1.34291 3.53778 1.12813 3.72272 0.975819C3.90303 0.820627 4.13358 0.736225 4.37147 0.738319H11.889C12.174 0.738319 12.5827 0.793319 13.1127 0.902069C13.6477 1.00707 14.114 1.14457 14.5165 1.30332C15.414 1.64582 16.099 2.16332 16.5727 2.84957C17.0465 3.53957 17.2827 4.35832 17.2827 5.31457Z" />
                </svg>
                <span>Paypal</span>
              </button>
            </div>
            <p className="terms">
              Haciendo clic en &quot;Paypal&quot; reconozco haber aceptado los{" "}
              <Link to={"/terms"}>términos y condiciones</Link>, y la{" "}
              <Link to={"/politics"}>política de privacidad</Link>.
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
