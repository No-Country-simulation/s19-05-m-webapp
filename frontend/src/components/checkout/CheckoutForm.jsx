import { useDispatch, useSelector } from "react-redux";
import checkoutFields from "../../utils/checkoutFields";
import Form from "../form/Form";
import "./checkout.css";
import { setShipping } from "../../store/slices/shipping.slice";
import { useState } from "react";
import { checkoutSchema } from "../../validations/checkout.schema";

const products = [
  {
    name: "Minecraft: Java & Bedrock Edition",
    quantity: 2,
    price: 14.49,
    platform: "Other",
  },
  { name: "7 Days to Die", quantity: 1, price: 17.18, platform: "Steam" },
  {
    name: "S.T.A.L.K.E.R. 2: Heart of Chornobyl",
    quantity: 1,
    price: 47.69,
    platform: "Steam",
  },
];

export const CheckoutForm = () => {
  const dispatch = useDispatch();
  const shipping = useSelector((state) => state.Shipping);
  const [errors, setErrors] = useState({});
  const totalAmount = products.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );

  const handleCheckoutSubmit = (formValues) => {
    checkoutSchema
      .validate(formValues, { abortEarly: false })
      .then(() => {
        dispatch(setShipping(formValues));
        localStorage.setItem("shipping", JSON.stringify(formValues));
        setErrors({});
        console.log({ formValues });
      })
      .catch((validationErrors) => {
        const formattedErrors = {};
        validationErrors.inner.forEach((error) => {
          formattedErrors[error.path] = error.message;
        });
        setErrors(formattedErrors);
      });
  };

  return (
    <div>
      <h2>Dirección de facturación</h2>
      <Form
        fields={checkoutFields.fields}
        onSubmit={handleCheckoutSubmit}
        initialValues={shipping}
        errors={errors}
        buttonText="Guardar"
        showButton={false}
      />

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
        <div className="pay-button">{/* TODO: Paypal button */}</div>
        <p className="terms">
          Haciendo clic en &quot;Pagar&quot; reconozco haber aceptado los{" "}
          <a href="#terms">términos y condiciones</a>, y la{" "}
          <a href="#privacy">política de privacidad</a>.
        </p>
      </div>
    </div>
  );
};
