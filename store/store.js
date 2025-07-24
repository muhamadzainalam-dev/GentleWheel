import { configureStore } from "@reduxjs/toolkit";
import listingsReducer from "./listingsSlice";
import formdataReducer from "./formdataSlice";

export const store = configureStore({
  reducer: {
    listings: listingsReducer,
    formdata: formdataReducer,
  },
});
