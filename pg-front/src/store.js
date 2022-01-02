import { configureStore } from "@reduxjs/toolkit";
import generalReducer from "./redux/generalSlice";

export const store = configureStore({
  reducer: {
    general: generalReducer,
  },
});
