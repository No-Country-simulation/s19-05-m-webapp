import { useState } from "react";
import { CheckoutForm } from "../components/checkout/CheckoutForm";
import { Payment } from "../components/checkout/Payment";
import { Checkout } from "../components/checkout/Checkout";
import { useCart } from "../contexts/CartContext/CartContext";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useLogin from "../hooks/useLogin";
import GoogleAuth from "../components/GoogleAuth/GoogleAuth";

export const CheckoutPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const { state: products } = useCart();
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const { isLoginOpen, openLogin, closeLogin } = useLogin();

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const previousStep = () =>
    setCurrentStep((prev) => (prev > 1 ? prev - 1 : prev));

  const totalAmount = products.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );

  if (!products.length) {
    return (
      <div className="page-container">
        <div className="steps-container">
          <h2>Cesta Vacía</h2>
          <p>No hay productos en la cesta.</p>
          <button className="back-button" onClick={() => navigate("/")}>
            Volver a la tienda
          </button>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="page-container">
        <div className="steps-container">
          <h2>Inicia Sesión</h2>
          <p>Debes iniciar sesión para continuar con el proceso de compra.</p>
          <button onClick={openLogin} className="next-button">
            Iniciar sesión
          </button>
          <GoogleAuth isOpen={isLoginOpen} onClose={closeLogin} />
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="steps-container">
        <div className="steps-indicator">
          <div className={`step ${currentStep >= 1 ? "active" : ""}`}>
            <div className="circle">1</div>
            <span>Cesta</span>
          </div>
          <div
            className={`connector ${currentStep >= 2 ? "active" : ""}`}
          ></div>
          <div className={`step ${currentStep >= 2 ? "active" : ""}`}>
            <div className="circle">2</div>
            <span>Dirección</span>
          </div>
          <div
            className={`connector ${currentStep >= 3 ? "active" : ""}`}
          ></div>
          <div className={`step ${currentStep >= 3 ? "active" : ""}`}>
            <div className="circle">3</div>
            <span>Pago</span>
          </div>
        </div>

        {currentStep === 1 && (
          <Checkout
            onNext={nextStep}
            products={products}
            totalAmount={totalAmount}
          />
        )}
        {currentStep === 2 && (
          <CheckoutForm onGoBack={previousStep} onFormSubmit={nextStep} />
        )}
        {currentStep === 3 && (
          <Payment
            onGoBack={previousStep}
            products={products}
            totalAmount={totalAmount}
          />
        )}
      </div>
    </div>
  );
};
