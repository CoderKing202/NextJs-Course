import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import subtotalReducer from "./subTotalSlice"
import ProgressReducer from  "./ProgressSlice"
import UserLoginReducer from "./UserLoginSlice"
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    // subTotal:subtotalReducer
    progress:ProgressReducer,
    userLogin:UserLoginReducer
  },
});
