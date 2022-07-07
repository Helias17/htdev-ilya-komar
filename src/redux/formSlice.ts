import { createSlice } from "@reduxjs/toolkit";

export const formSlice = createSlice({
  name: "form",
  initialState: {
    value: false,
  },
  reducers: {
    blockForm: (state) => {
      state.value = true;
    },
    unblockForm: (state) => {
      state.value = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { blockForm, unblockForm } = formSlice.actions;

export default formSlice.reducer;
