import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./reducer/AuthReducer";
import blogSlice from "./reducer/blogSlice";

export const store = configureStore({
  reducer: {
    AuthReducer: AuthReducer,
    blogs: blogSlice,
  },
});
