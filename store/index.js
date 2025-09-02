import { configureStore } from "@reduxjs/toolkit";
import omsStatusReducer from "./omsStatusSlice";

export default configureStore({
  reducer: {
    omsStatus: omsStatusReducer,
    // ...other reducers
  },
});
