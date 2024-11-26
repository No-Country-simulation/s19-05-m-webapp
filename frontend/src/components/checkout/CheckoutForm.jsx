import { useDispatch, useSelector } from "react-redux";
import checkoutFields from "../../utils/checkoutFields";
import Form from "../form/Form";
import "./checkout.css";
import { setShipping } from "../../store/slices/shipping.slice";
import { useState } from "react";
import { checkoutSchema } from "../../validations/checkout.schema";

export const CheckoutForm = () => {
  const dispatch = useDispatch();
  const shipping = useSelector((state) => state.Shipping);

  const [rememberMe, setRememberMe] = useState(shipping?.name !== "");
  const [errors, setErrors] = useState({});

  const handleCheckoutSubmit = (formValues) => {
    checkoutSchema
      .validate(formValues, { abortEarly: false })
      .then(() => {
        dispatch(setShipping(formValues));
        if (rememberMe)
          localStorage.setItem("shipping", JSON.stringify(formValues));
        setErrors({});
        console.log({formValues});
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
      <h2>Formulario de envió</h2>
      <Form
        fields={checkoutFields.fields}
        onSubmit={handleCheckoutSubmit}
        initialValues={shipping}
        errors={errors}
        buttonText="Enviar"
      />
      <div className="remember-contain">
        <label htmlFor="rememberMe">
          {" "}
          <input
            type="checkbox"
            id="rememberMe"
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
          />
          Recuérdame
        </label>
      </div>
    </div>
  );
};
