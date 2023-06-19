import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "./api";
import chatReducer from "./features/chatSlice";
import userReducer from "./features/userSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    user: userReducer,
    chat: chatReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
