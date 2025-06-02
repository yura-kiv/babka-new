import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { UIState } from "@/types/store";
import audioService from "@/services/audioService";

const initialState: UIState = {
  isLoading: false,
  errorMessage: null,
  isMuted: false,
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
    setMuted: (state, action: PayloadAction<boolean>) => {
      state.isMuted = action.payload;
      if (action.payload) {
        audioService.mute();
      } else {
        audioService.unmute();
      }
    },
  },
});

export const { 
  setLoading, 
  setErrorMessage, 
  clearErrorMessage,
  setMuted, 
} = uiSlice.actions;
export default uiSlice.reducer;
