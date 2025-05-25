import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { GameState, StartGamePayload, OpenCellPayload, StopGamePayload } from "@/types/store";
import { logout as logoutUser } from "@/store/slices/userSlice";

const API_BASE_URL = "http://localhost:3030";

// Start game
export const startGame = createAsyncThunk(
  "game/startGame",
  async ({ bet, bombsCount }: StartGamePayload, { getState, rejectWithValue, dispatch }) => {
    try {
      const state = getState() as { user: { token: string } };
      const token = state.user.token;
      
      const res = await fetch(`${API_BASE_URL}/game/start`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ bet, bombsCount }),
      });
      
      if (res.status === 401) {
        dispatch(logoutUser());
        return rejectWithValue("Not authenticated");
      }
      
      const data = await res.json();
      if (!res.ok) {
        return rejectWithValue(data.message || "Failed to start game");
      }
      
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to start game");
    }
  }
);

// Open cell
export const openCell = createAsyncThunk(
  "game/openCell",
  async ({ level, cellIndex }: OpenCellPayload, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { user: { token: string } };
      const token = state.user.token;
      
      const res = await fetch(`${API_BASE_URL}/game/open/${level}/${cellIndex}`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      });
      
      const data = await res.json();
      if (!res.ok) {
        return rejectWithValue(data.message || "Failed to open cell");
      }
      
      // Attach cellIndex for updating openedCells
      return { ...data, cellIndex };
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to open cell");
    }
  }
);

// Cash out (stop) game
export const stopGame = createAsyncThunk(
  "game/stopGame",
  async ({ level }: StopGamePayload, { getState, rejectWithValue, dispatch }) => {
    try {
      const state = getState() as { user: { token: string } };
      const token = state.user.token;
      
      const res = await fetch(`${API_BASE_URL}/game/stop/${level}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if (res.status === 401) {
        dispatch(logoutUser());
        return rejectWithValue("Not authenticated");
      }
      
      const data = await res.json();
      if (!res.ok) {
        return rejectWithValue(data.message || "Failed to cash out");
      }
      
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to cash out");
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
