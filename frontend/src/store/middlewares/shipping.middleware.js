import { clearShipping, setShipping } from "../slices/shipping.slice";

const shippingMiddleware = (store) => (next) => (action) => {
  const result = next(action);

  if (setShipping.match(action)) {
    const shippingState = store.getState().shipping;
    localStorage.setItem("shipping", JSON.stringify(shippingState));
  }

  if (clearShipping.match(action)) {
    localStorage.removeItem("shipping");
  }

  return result;
};

export default shippingMiddleware;
