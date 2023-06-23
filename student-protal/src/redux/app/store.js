import { configureStore } from "@reduxjs/toolkit";

import apiSlice from "../features/api/apiSlice";
import authSlice from "../features/auth/authSlice";

const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares().concat(apiSlice.middleware),
});

export default store;
