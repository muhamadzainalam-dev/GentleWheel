import { createSlice } from "@reduxjs/toolkit";

const listingsSlice = createSlice({
  name: "listings",
  initialState: {
    item: null, 
  },
  reducers: {
    setListing: (state, action) => {
      state.item = action.payload; 
    },
    clearListing: (state) => {
      state.item = null;
    },
  },
});

export const { setListing, clearListing } = listingsSlice.actions;
export default listingsSlice.reducer;
