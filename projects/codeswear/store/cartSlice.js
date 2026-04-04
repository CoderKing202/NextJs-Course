import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: {},
  subTotal: 0,
};

const calculateSubTotal = (cart, state) => {
  let sbt = 0;
  let keys = Object.keys(cart);
  for (let i = 0; i < keys.length; i++) {
    sbt += cart[keys[i]].qty * cart[keys[i]].price;
  }
  state.subTotal = sbt;
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart:(state,action)=>{
      state.cart = action.payload
    },
    addToCart: (state, action) => {
      let { cart } = state;
      
      let { itemCode, qty , price, name, size, variant} = action.payload;
      let newItem = {qty , price, name, size, variant}
      if (itemCode in state.cart) {
        cart[itemCode].qty += qty;
        console.log("hellow")
      } else {

        cart[itemCode] = newItem;
      }
      calculateSubTotal(cart, state);
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },

    removeFromCart: (state, action) => {
      let { subTotal, cart } = state;
      let { itemCode, qty } = action.payload;
      if (itemCode in state.cart) {
        cart[itemCode].qty -= qty;
      }

      if (itemCode in state.cart && cart[itemCode].qty <= 0) {
        delete cart[itemCode];
      }
      calculateSubTotal(cart, state);
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    clearCart: (state) => {
      state.cart = {};
      state.subTotal = 0;
      localStorage.setItem("cart",JSON.stringify({}))
    },
  },
});

export const {setCart, addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
