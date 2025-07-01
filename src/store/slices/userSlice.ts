import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { BalanceType, type UserState } from '@/types';

const initialUserState: UserState = {
  // auth
  token: '',
  userId: null,
  // profile
  isActived: false,
  username: null,
  balance: 0,
  email: null,
  avatarUrl: null,
  demoBalance: 0,
  selectedBalance: BalanceType.REAL,
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {
    logout: () => initialUserState,
    setUser: (state, action: PayloadAction<Partial<UserState>>) => {
      Object.assign(state, action.payload);
    },
    setBalance: (state, action: PayloadAction<number>) => {
      state.balance = action.payload;
    },
    setDemoBalance: (state, action: PayloadAction<number>) => {
      state.demoBalance = action.payload;
    },
    setSelectedBalance: (state, action: PayloadAction<BalanceType>) => {
      state.selectedBalance = action.payload;
    },
    updateToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
});

export const {
  logout,
  setSelectedBalance,
  updateToken,
  setUser,
  setDemoBalance,
  setBalance,
} = userSlice.actions;
export default userSlice.reducer;
