import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "./api";
import userReducer from './features/userSlice';

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    user : userReducer
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
