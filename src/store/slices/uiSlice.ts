import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { UIState } from "@/types";
import audioService from "@/services/audioService";

const initialState: UIState = {
  isLoading: false,
  isMuted: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
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
  setMuted, 
} = uiSlice.actions;
export default uiSlice.reducer;
