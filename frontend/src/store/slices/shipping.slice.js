import { createSlice } from "@reduxjs/toolkit";
import checkoutFields from "../../utils/checkoutFields";

const savedShippingState = localStorage.getItem("shipping");

export const initialShippingState =
  savedShippingState && savedShippingState !== "undefined"
    ? JSON.parse(savedShippingState)
    : checkoutFields.initialValues;

const shippingSlice = createSlice({
  name: "shipping",
  initialState: initialShippingState,
  reducers: {
    setShipping: (state, action) => {
      return { ...state, ...action.payload };
    },
    clearShipping: () => initialShippingState,
  },
});

export const { setShipping, clearShipping } = shippingSlice.actions;

export default shippingSlice.reducer;
