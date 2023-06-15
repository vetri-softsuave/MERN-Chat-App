import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  picture: "",
  token: "",
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.picture = action.payload.picture;
    },
    setAccessToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { setUserDetails, setAccessToken } = userSlice.actions;
export default userSlice.reducer;
