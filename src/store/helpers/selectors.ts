import type { AppRootState } from '@/store';
import { createSelector } from '@reduxjs/toolkit';
import { BalanceType } from '@/types';

// --- USER SELECTORS ---
export const getUser = (state: AppRootState) => state.user;

export const getUserToken = (state: AppRootState) => state.user.token;

export const getUserIsActivated = (state: AppRootState) => state.user.isActived;

export const getUserSelectedBalance = (state: AppRootState) =>
  state.user.selectedBalance;

export const getUserBalance = createSelector(
  [(state: AppRootState) => state.user],
  (user) =>
    user.selectedBalance === BalanceType.DEMO ? user.demoBalance : user.balance
);

// --- UI SELECTORS ---
export const getUiState = (state: AppRootState) => state.ui;

export const getIsMuted = createSelector(
  [(state: AppRootState) => state.ui.isMuted],
  (isMuted) => isMuted
);
