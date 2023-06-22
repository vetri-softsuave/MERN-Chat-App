import { createSlice } from "@reduxjs/toolkit";
import apiSlice from "../api";

const initialState = {
  userId: "",
  name: "",
  email: "",
  picture: "",
  token: localStorage.getItem("accessToken"),
  isLoggedIn: false,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state.userId = action.payload._id;
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.picture = action.payload.picture;
    },
    setAccessToken: (state, action) => {
      state.token = action.payload.accessToken;
      state.isLoggedIn = true;
      localStorage.setItem("accessToken", action.payload.accessToken);
    },
    logout: (state) => {
      state.email = "";
      state.name = "";
      state.picture = "";
      state.token = "";
      state.isLoggedIn = false;
      localStorage.clear();
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      apiSlice.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        state.token = payload.accessToken;
        state.isLoggedIn = true;
        localStorage.setItem("accessToken", payload.accessToken);
      }
    ),
      builder.addMatcher(
        apiSlice.endpoints.getUserDetails.matchFulfilled,
        (state, { payload }) => {
          state.userId = payload.user._id;
          state.email = payload.user.email;
          state.name = payload.user.name;
          state.picture = payload.user.picture;
        }
      ),
      builder.addMatcher(apiSlice.endpoints.logout.matchFulfilled, (state) => {
        state.userId = "";
        state.email = "";
        state.name = "";
        state.picture = "";
        state.token = "";
        state.isLoggedIn = false;
        localStorage.clear();
      });
  },
});

export const { setUserDetails, setAccessToken, logout } = userSlice.actions;
export default userSlice.reducer;
