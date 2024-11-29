import { configureStore } from "@reduxjs/toolkit";
import ProductsGlobal from "./slices/products.slices";
import Shipping from "./slices/shipping.slice";
import shippingMiddleware from "./middlewares/shipping.middleware";

const store = configureStore({
  reducer: { ProductsGlobal, Shipping },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(shippingMiddleware),
});

export default store;
