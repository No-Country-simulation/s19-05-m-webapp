import { configureStore } from "@reduxjs/toolkit";
import ProductsGlobal from "./slices/products.slices";

const store = configureStore({
  reducer: { ProductsGlobal },
});

export default store;
