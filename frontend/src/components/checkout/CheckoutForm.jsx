import { useDispatch, useSelector } from "react-redux";
import checkoutFields from "../../utils/checkoutFields";
import Form from "../form/Form";
import "./checkout.css";
import { setShipping } from "../../store/slices/shipping.slice";
import { useState } from "react";
import { checkoutSchema } from "../../validations/checkout.schema";

export const CheckoutForm = ({ onGoBack, onFormSubmit }) => {
  const dispatch = useDispatch();
  const shipping = useSelector((state) => state.Shipping);
  const [errors, setErrors] = useState({});

  const handleCheckoutSubmit = (formValues) => {
    checkoutSchema
      .validate(formValues, { abortEarly: false })
      .then(() => {
        dispatch(setShipping(formValues));
        localStorage.setItem("shipping", JSON.stringify(formValues));
        setErrors({});
        onFormSubmit();
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
    <div className="container">
      <h2>Dirección de facturación</h2>
      <Form
        fields={checkoutFields.fields}
        onSubmit={handleCheckoutSubmit}
        initialValues={shipping}
        errors={errors}
        buttonText="Siguiente"
      />
      <hr />
      <button className="back-button full-width" onClick={onGoBack}>
        Regresar
      </button>
    </div>
  );
};
