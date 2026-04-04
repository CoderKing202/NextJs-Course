import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import subtotalReducer from "./subTotalSlice"

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    // subTotal:subtotalReducer
  },
});
