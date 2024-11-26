import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
  name: "productsGlobal",
  initialState: null,
  reducers: {
    setProductsGlobal: (state, action) => action.payload,
  },
});

export const { setProductsGlobal } = productsSlice.actions;

export default productsSlice.reducer;
