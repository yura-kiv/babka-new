import type { AppRootState } from '@/store';
import { createSelector } from '@reduxjs/toolkit';

// --- AUTH SELECTORS ---
export const isUserAuthenticated = createSelector(
  [(state: AppRootState) => state.user.isAuthenticated],
  (isAuthenticated) => isAuthenticated
);

export const getAuthToken = createSelector(
  [(state: AppRootState) => state.user.token],
  (token) => token
);

// --- USER SELECTORS ---
export const getUserData = createSelector(
  [(state: AppRootState) => state.user],
  (user) => ({
    isAuthenticated: user.isAuthenticated,
    token: user.token,
    userId: user.userId,
    username: user.username,
    email: user.email,
    balance: user.balance,
    avatarUrl: user.avatarUrl,
    selectedBalance: user.selectedBalance,
    demoBalance: user.demoBalance
  })
);

export const getUserBalance = createSelector(
  [(state: AppRootState) => state.user.balance],
  (balance) => balance
);

export const getUserId = createSelector(
  [(state: AppRootState) => state.user.userId],
  (userId) => userId
);

// --- BALANCE SELECTORS ---
export const getSelectedBalanceType = createSelector(
  [(state: AppRootState) => state.user.selectedBalance],
  (selectedBalance) => selectedBalance
);

export const getCurrentBalance = createSelector(
  [
    (state: AppRootState) => state.user.selectedBalance,
    (state: AppRootState) => state.user.balance,
    (state: AppRootState) => state.user.demoBalance
  ],
  (selectedBalance, balance, demoBalance) => {
    return selectedBalance === 'real' ? balance : demoBalance;
  }
);

export const getDemoBalance = createSelector(
  [(state: AppRootState) => state.user.demoBalance],
  (demoBalance) => demoBalance
);

// --- GAME SELECTORS ---
export const getGameState = createSelector(
  [(state: AppRootState) => state.game],
  (game) => game
);

export const getGameResult = createSelector(
  [(state: AppRootState) => state.game.result],
  (result) => result
);

export const getCurrentLevel = createSelector(
  [(state: AppRootState) => state.game.currentLevel],
  (currentLevel) => currentLevel
);

export const getFinalWin = createSelector(
  [(state: AppRootState) => state.game.finalWin],
  (finalWin) => finalWin
);

// --- MULTIPLIERS SELECTORS ---
export const getMultipliers = createSelector(
  [(state: AppRootState) => state.multipliers.values],
  (values) => values
);

// --- UI SELECTORS ---
export const getUiState = createSelector(
  [(state: AppRootState) => state.ui],
  (ui) => ui
);