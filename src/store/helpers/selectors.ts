import { store } from "@/store";

// --- AUTH SELECTORS ---
export const isUserAuthenticated = (): boolean => store.getState().user.isAuthenticated;

export const getAuthToken = (): string => store.getState().user.token;

export const getUserId = (): number | null => store.getState().user.userId;

// --- USER SELECTORS ---
export const getUserData = () => store.getState().user;

export const getUserBalance = (): number => store.getState().user.balance;

// --- BALANCE SELECTORS ---
export const getSelectedBalanceType = (): 'real' | 'demo' => 
  store.getState().user.selectedBalance;

export const getCurrentBalance = (): number => {
  const state = store.getState().user;
  return state.selectedBalance === 'real' ? state.balance : state.demoBalance;
};

export const getDemoBalance = (): number => 
  store.getState().user.demoBalance;

// --- GAME SELECTORS ---
export const getGameState = () => store.getState().game;

export const getGameResult = (): string | null => store.getState().game.result;

export const getCurrentLevel = (): number | null => store.getState().game.currentLevel;

export const getFinalWin = (): number => store.getState().game.finalWin;

// --- MULTIPLIERS SELECTORS ---
export const getMultipliers = (): Record<string, number> => store.getState().multipliers.values;

// --- SUBSCRIPTION ---
export const subscribeToStore = (callback: () => void): (() => void) => store.subscribe(callback);
