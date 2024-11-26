import checkoutFields from "../../utils/checkoutFields";
import Form from "../form/Form";
import "./checkout.css";

export const CheckoutForm = () => {
  const handleCheckoutSubmit = (formValues) => {
    console.log("Checkout:", formValues);
  };

  return (
    <div>
      <Form
        fields={checkoutFields.fields}
        onSubmit={handleCheckoutSubmit}
        initialValues={checkoutFields.initialValues}
        buttonText="Enviar"
      />
    </div>
  );
};
