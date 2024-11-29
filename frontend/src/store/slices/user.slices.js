import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: '',
    email: '',
    password: ''
  };

const userSlice = createSlice({
    name: "user",
    initialState,
     reducers: {
       setRegister: (state, action) => {
         state.name = action.payload.name;
         state.email = action.payload.email;
         state.password = action.payload.password;
       },
     },
   });
   
   export const { setRegister } = userSlice.actions;
   export default userSlice.reducer;