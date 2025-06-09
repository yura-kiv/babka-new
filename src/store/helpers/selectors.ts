import type { AppRootState } from '@/store';
import { createSelector } from '@reduxjs/toolkit';
import { BalanceType } from '@/types';

// --- AUTH SELECTORS ---
export const isUserAuthenticated = (state: AppRootState) => state.user.isAuthenticated;

// --- USER SELECTORS ---
export const getUserData = (state: AppRootState) => state.user;

export const getUserBalance = createSelector(
  [(state: AppRootState) => state.user],
  (user) => user.selectedBalance === BalanceType.DEMO ? user.demoBalance : user.balance
);

// --- BALANCE SELECTORS ---
export const getSelectedBalanceType = createSelector(
  [(state: AppRootState) => state.user.selectedBalance],
  (selectedBalance) => selectedBalance
);

// --- GAME SELECTORS ---
export const getGameState = (state: AppRootState) => state.game;

// --- MULTIPLIERS SELECTORS ---
export const getMultipliers = (state: AppRootState) => state.multipliers.values;

// --- UI SELECTORS ---
export const getUiState = (state: AppRootState) => state.ui;

export const getIsMuted = createSelector(
  [(state: AppRootState) => state.ui.isMuted],
  (isMuted) => isMuted
);