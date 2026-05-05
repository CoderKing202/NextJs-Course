import { createSlice } from "@reduxjs/toolkit";
const initialState = 0;

const ProgressSlice = createSlice({
  name: "subTotal",
  initialState,
  reducers: {
    setProgress: (state, action) => {
      return action.payload;
    },
  },
});
export const { setProgress } = ProgressSlice.actions;
export default ProgressSlice.reducer;
