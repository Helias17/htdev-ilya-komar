import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { POSTS_PER_PAGE } from "../constants";

const postsPerPageStorage = localStorage.getItem("ilya-komar-posts-per-page");
const postsPerPageInitial = postsPerPageStorage
  ? parseInt(postsPerPageStorage)
  : POSTS_PER_PAGE[1];

export const pageSizeSlice = createSlice({
  name: "pageSize",
  initialState: {
    value: postsPerPageInitial,
  },
  reducers: {
    setPageSize: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setPageSize } = pageSizeSlice.actions;

export default pageSizeSlice.reducer;
