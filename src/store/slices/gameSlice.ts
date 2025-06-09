import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import { type GameState, GameStatusFront, BalanceType, type RowNumber } from "@/types";
import { gameApi } from "@/api";
import { getUserData, getGameState } from "@/store/helpers/selectors";
import type { AppRootState } from "@/store";

// Start game
export const startGame = createAsyncThunk(
  "game/startGame",
  async (_, { rejectWithValue, getState }) => {
    const state = getState() as AppRootState;
    const user = getUserData(state);
    const game = getGameState(state);
    try {
      const { data } = await gameApi.startGame({ bet: game.bet, bombsCount: game.bombsCount, isDemo: user.selectedBalance === BalanceType.DEMO });
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to start game");
    }
  }
);

// Open cell
export const openCell = createAsyncThunk(
  "game/openCell",
  async (cell: number, { rejectWithValue, getState }) => {
    const state = getState() as AppRootState;
    const activeRow = getGameState(state).activeRow;
    if (!activeRow) {
      return rejectWithValue("Active row is not defined");
    }
    try {
      const { data } = await gameApi.openCell(activeRow, cell);
      return { ...data, cellIndex: cell };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to open cell");
    }
  }
);

// Cash out (stop) game
export const stopGame = createAsyncThunk(
  "game/stopGame",
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState() as AppRootState;
      const activeRow = getGameState(state).activeRow;
      if (!activeRow) {
        return rejectWithValue("Active row is not defined");
      }
      const { data } = await gameApi.stopGame(activeRow);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to cash out");
    }
  }
);

const initialState: GameState = {
  isLoading: false,
  bet: 0,
  bombsCount: 0,
  activeRow: null,
  status: GameStatusFront.INITIAL,
  mode: BalanceType.REAL,
  openedCells: {
    0: [],
    1: [],
    2: [],
  }
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    resetGame: () => initialState,
    setBet: (state, action: PayloadAction<number>) => {
      state.bet = action.payload;
    },
    setBombsCount: (state, action: PayloadAction<number>) => {
      state.bombsCount = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // startGame
      .addCase(startGame.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(startGame.fulfilled, (state, { payload }) => {
        const { result, bet, bombsCount, currentLevel, finalWin, message, isDemo } = payload;
        state.isLoading = false;
        state.status = GameStatusFront.PROGRESS;
        state.bet = bet;
        state.bombsCount = bombsCount;
        state.activeRow = Number(currentLevel) as RowNumber;
        state.mode = isDemo ? BalanceType.DEMO : BalanceType.REAL;
      })
      .addCase(startGame.rejected, (state, { payload }) => {
        state.isLoading = false;
      })

      // openCell
      .addCase(openCell.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(openCell.fulfilled, (state, { payload }) => {
        const { cellIndex, message, cellStatus, cellType, currentLevel, finalWin, gameEnd, gameStatus } = payload;
        const _activeRow = Number(currentLevel) as RowNumber;
        state.isLoading = false;
        state.activeRow = _activeRow;
        state.openedCells[_activeRow].push({ id: cellIndex, type: cellType! });
      })
      .addCase(openCell.rejected, (state) => {
        state.isLoading = false;
      })

      // stopGame
      .addCase(stopGame.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(stopGame.fulfilled, (state, { payload }) => {
        const { gameStatus, finalWin, gameEnd, message } = payload;
        state.isLoading = false;
        state.status = GameStatusFront.END;
      })
      .addCase(stopGame.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { resetGame, setBet, setBombsCount } = gameSlice.actions;
export default gameSlice.reducer;
