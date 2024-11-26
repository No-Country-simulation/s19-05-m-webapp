import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./slices/products.slices";
import authReducer from "./slices/auth.slices";

const store = configureStore({
  reducer: { 
    auth: authReducer,
    products: productsReducer,
  },
});

export default store;
