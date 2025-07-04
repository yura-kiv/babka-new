import { store } from '@/store';

import {
  logout,
  setSelectedBalance,
  setDemoBalance,
  setBalance,
  setUser,
  updateToken,
} from '@/store/slices/userSlice';

import type { BalanceType, UserState } from '@/types';

import { setLoading, setMuted } from '@/store/slices/uiSlice';

// --- AUTH & USER ---
export const logoutUser = () => store.dispatch(logout());

export const setUserState = (user: Partial<UserState>) =>
  store.dispatch(setUser(user));

export const updateUserToken = (token: string) =>
  store.dispatch(updateToken(token));

// -- BALANCE --
export const changeSelectedBalance = (balance: BalanceType) =>
  store.dispatch(setSelectedBalance(balance));

export const changeDemoBalance = (balance: number) =>
  store.dispatch(setDemoBalance(balance));

export const changeBalance = (balance: number) =>
  store.dispatch(setBalance(balance));

// UI
export const setUiLoading = (isLoading: boolean) =>
  store.dispatch(setLoading(isLoading));

export const setUiMuted = (muted: boolean) => store.dispatch(setMuted(muted));
