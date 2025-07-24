import { createSlice } from "@reduxjs/toolkit";

const formdataSlice = createSlice({
  name: "formdata",
  initialState: {
    data: null,
  },
  reducers: {
    setFormdata: (state, action) => {
      state.data = action.payload;
    },
    clearFormdata: (state) => {
      state.data = null;
    },
  },
});

export const { setFormdata, clearFormdata } = formdataSlice.actions;
export default formdataSlice.reducer;
