import { configureStore } from "@reduxjs/toolkit";
import formReducer from "./formSlice";
import pageSizeReducer from "./pageSizeSlice";

const store = configureStore({
  reducer: {
    form: formReducer,
    pageSize: pageSizeReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
