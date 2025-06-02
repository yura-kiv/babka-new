import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { GameState, StartGamePayload, OpenCellPayload, StopGamePayload } from "@/types/store";
import { logout as logoutUser } from "@/store/slices/userSlice";
import { gameApi } from "@/api";

// Start game
export const startGame = createAsyncThunk(
  "game/startGame",
  async (payload: StartGamePayload, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await gameApi.startGame(payload);
      return data;
    } catch (error: any) {
      if (error.response?.status === 401) {
        dispatch(logoutUser());
        return rejectWithValue("Not authenticated");
      }
      return rejectWithValue(error.response?.data?.message || "Failed to start game");
    }
  }
);

// Open cell
export const openCell = createAsyncThunk(
  "game/openCell",
  async ({ level, cellIndex }: OpenCellPayload, { rejectWithValue }) => {
    try {
      const { data } = await gameApi.openCell(level, cellIndex);
      
      // Attach cellIndex for updating openedCells
      return { ...data, cellIndex };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to open cell");
    }
  }
);

// Cash out (stop) game
export const stopGame = createAsyncThunk(
  "game/stopGame",
  async ({ level }: StopGamePayload, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await gameApi.stopGame(level);
      return data;
    } catch (error: any) {
      if (error.response?.status === 401) {
        dispatch(logoutUser());
        return rejectWithValue("Not authenticated");
      }
      return rejectWithValue(error.response?.data?.message || "Failed to cash out");
    }
  }
);

const initialState: GameState = {
  bet: 0,
  bombsCount: 0,
  currentLevel: null,
  openedCells: [],
  cellType: null,
  cellStatus: null,
  frontStatus: null,
  result: null,
  finalWin: 0,
  endedAt: null,
  error: null,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    resetGame: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // startGame
      .addCase(startGame.pending, (state) => {
        state.frontStatus = "loading";
        state.error = null;
      })
      .addCase(startGame.fulfilled, (state, { payload }) => {
        state.frontStatus = "succeeded";
        state.bet = payload.bet;
        state.bombsCount = payload.bombsCount;
        state.currentLevel = payload.currentLevel;
        state.result = payload.gameStatus;
        state.openedCells = [];
        state.cellType = null;
        state.cellStatus = null;
        state.finalWin = 0;
        state.endedAt = null;
      })
      .addCase(startGame.rejected, (state, { payload }) => {
        state.frontStatus = "failed";
        state.error = payload as string;
      })

      // openCell
      .addCase(openCell.pending, (state) => {
        state.frontStatus = "loading";
        state.error = null;
      })
      .addCase(openCell.fulfilled, (state, { payload }) => {
        state.frontStatus = "succeeded";
        state.result = payload.gameStatus;
        if (payload.gameStatus === "in_progress") {
          state.openedCells.push(payload.cellIndex);
          state.cellType = payload.cellType;
          state.cellStatus = payload.cellStatus;
          state.currentLevel = payload.currentLevel;
        } else {
          state.finalWin = payload.finalWin;
          state.endedAt = payload.gameEnd;
        }
      })
      .addCase(openCell.rejected, (state, { payload }) => {
        state.frontStatus = "failed";
        state.error = payload as string;
      })

      // stopGame
      .addCase(stopGame.pending, (state) => {
        state.frontStatus = "loading";
        state.error = null;
      })
      .addCase(stopGame.fulfilled, (state, { payload }) => {
        state.frontStatus = "succeeded";
        state.result = payload.gameStatus;
        state.finalWin = payload.finalWin;
        state.endedAt = payload.gameEnd;
      })
      .addCase(stopGame.rejected, (state, { payload }) => {
        state.frontStatus = "failed";
        state.error = payload as string;
      });
  },
});

export const { resetGame } = gameSlice.actions;
export default gameSlice.reducer;
