import { createSlice } from "@reduxjs/toolkit";
const initialState = 0;

const KeySlice = createSlice({
  name: "subTotal",
  initialState,
  reducers: {
    setKey: (state, action) => {
      return action.payload;
    },
  },
});
export const { setKey } = KeySlice.actions;
export default KeySlice.reducer;
