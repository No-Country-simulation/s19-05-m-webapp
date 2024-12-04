import { configureStore } from "@reduxjs/toolkit";
import ProductsGlobal from "./slices/products.slices";
import Shipping from "./slices/shipping.slice";
import shippingMiddleware from "./middlewares/shipping.middleware";
import authReducer from "./slices/auth.slices";
import userReducer from "./slices/user.slices";

const store = configureStore({
  reducer: { ProductsGlobal, Shipping, auth:authReducer, user:userReducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(shippingMiddleware),
});

export default store;
