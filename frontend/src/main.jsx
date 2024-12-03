import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App.jsx";
import store from "./store/index.js";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext/CartContext.jsx";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <PayPalScriptProvider
      options={{
        clientId: import.meta.env.VITE_PUBLIC_PAYPAL_CLIENT_ID ?? "",
        intent: "capture",
        currency: "USD",
      }}
    >
      <Provider store={store}>
        <CartProvider>
          <BrowserRouter
            future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
          >
            <App />
          </BrowserRouter>
        </CartProvider>
      </Provider>
    </PayPalScriptProvider>
  </StrictMode>
);
