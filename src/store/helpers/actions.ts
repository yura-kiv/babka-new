import { store } from "@/store";

import { 
  logout,
  setSelectedBalance,
  setUser,
  updateToken,
} from "@/store/slices/userSlice";

import { fetchMultipliers } from "@/store/slices/multipliersSlice";

import {
  startGame,
  openCell,
  stopGame,
  resetGame,
} from "@/store/slices/gameSlice";

import type { 
  StartGamePayload,
  BalanceType,
  UserState 
} from "@/types";

import {
  setLoading,
  setMuted,
} from "@/store/slices/uiSlice";

// --- AUTH & USER ---
export const logoutUser = () => store.dispatch(logout());

export const setUserState = (user: Partial<UserState>) => store.dispatch(setUser(user));

export const updateUserToken = (token: string) => store.dispatch(updateToken(token));

// --- MULTIPLIERS ---
export const loadMultipliers = () => store.dispatch(fetchMultipliers());

// --- GAME ---
export const initGame = (payload: StartGamePayload) => store.dispatch(startGame(payload));

export const revealCell = (lvl: number, cell: number) => store.dispatch(openCell({ level: lvl, cellIndex: cell }));

export const cashOut = (lvl: number) => store.dispatch(stopGame({ level: lvl }));

export const resetGameState = () => store.dispatch(resetGame());

// -- BALANCE --
export const changeSelectedBalance = (balance: BalanceType) => store.dispatch(setSelectedBalance(balance));

// UI
export const setUiLoading = (isLoading: boolean) => store.dispatch(setLoading(isLoading));

export const setUiMuted = (muted: boolean) => store.dispatch(setMuted(muted));


