import { createSlice } from "@reduxjs/toolkit";
const initialState = 0;

const subTotalSlice = createSlice({
  name: "subTotal",
  initialState,
  reducers: {
    setSubTotal: (state, action) => {
      let subTotal = 0;
      let { cart } = action.payload;
      let keys = Object.keys(cart);
      for (let i = 0; i < keys.length; i++) {
        subTotal += cart[keys[i]]["price"] * cart[keys[i]]["qty"];
      }
      state = subTotal;
    },
  },
});
export const { setSubTotal } = subTotalSlice.actions;
export default subTotalSlice.reducer;
