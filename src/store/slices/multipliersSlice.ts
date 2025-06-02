import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { MultipliersState } from "@/types/store";
import { multipliersApi } from "@/api";

export const fetchMultipliers = createAsyncThunk(
  "multipliers/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await multipliersApi.getMultipliers();
      return data.data; // { '1':1.1, '2':1.5, '3':1.9 }
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch multipliers");
    }
  }
);

const initialMultipliersState: MultipliersState = {
  values: {},
  status: "idle",
  error: null,
};

const multipliersSlice = createSlice({
  name: "multipliers",
  initialState: initialMultipliersState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMultipliers.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchMultipliers.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        state.values = payload;
      })
      .addCase(fetchMultipliers.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = payload as string;
      });
  },
});

export default multipliersSlice.reducer;
