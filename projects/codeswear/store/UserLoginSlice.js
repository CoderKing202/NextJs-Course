import { createSlice } from "@reduxjs/toolkit";

const initialState = { value: null };
const UserLoginSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setUserLogin: (state, action) => {
      state.value = action.payload.value;
      if(action.payload.email){
        state.email = action.payload.email;
      }
    },
  },
});

export const { setUserLogin } = UserLoginSlice.actions;

export default UserLoginSlice.reducer;
