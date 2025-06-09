import { store } from "@/store";

import { 
  logout,
  setSelectedBalance,
  setUser,
  updateToken,
} from "@/store/slices/userSlice";

import {
  startGame as startGameAction,
  openCell as openCellAction,
  stopGame as stopGameAction,
  resetGame as resetGameAction,
  setBet as setBetAction,
  setBombsCount as setBombsCountAction,
} from "@/store/slices/gameSlice";

import type { 
  BalanceType,
  UserState 
} from "@/types";

import {
  setLoading,
  setMuted,
} from "@/store/slices/uiSlice";

import { fetchMultipliers } from "@/store/slices/multipliersSlice";

// --- AUTH & USER ---
export const logoutUser = () => store.dispatch(logout());

export const setUserState = (user: Partial<UserState>) => store.dispatch(setUser(user));

export const updateUserToken = (token: string) => store.dispatch(updateToken(token));

// --- MULTIPLIERS ---
export const loadMultipliers = () => store.dispatch(fetchMultipliers());

// --- GAME ---
export const startGame = () => store.dispatch(startGameAction());

export const openCell = (cell: number) => store.dispatch(openCellAction(cell));

export const stopGame = () => store.dispatch(stopGameAction());

export const resetGame = () => store.dispatch(resetGameAction());

export const setBet = (bet: number) => store.dispatch(setBetAction(bet));

export const setBombsCount = (bombsCount: number) => store.dispatch(setBombsCountAction(bombsCount));

// -- BALANCE --
export const changeSelectedBalance = (balance: BalanceType) => store.dispatch(setSelectedBalance(balance));

// UI
export const setUiLoading = (isLoading: boolean) => store.dispatch(setLoading(isLoading));

export const setUiMuted = (muted: boolean) => store.dispatch(setMuted(muted));


