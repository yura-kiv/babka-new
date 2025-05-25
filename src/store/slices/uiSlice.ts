import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { UIState } from "@/types/store";

const initialState: UIState = {
  isLoading: false,
  errorMessage: null,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setErrorMessage: (state, action: PayloadAction<string | null>) => {
      state.errorMessage = action.payload;
    },
    clearErrorMessage: (state) => {
      state.errorMessage = null;
    },
  },
});

export const { setLoading, setErrorMessage, clearErrorMessage } = uiSlice.actions;
export default uiSlice.reducer;
