import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { BalanceType, type UserState } from "@/types";

const initialUserState: UserState = {
  isConfirmed: false,
  // auth
  token: "",
  userId: null,
  // profile
  username: null,
  balance: 0,
  email: null,
  avatarUrl: null,
  // demo balance
  selectedBalance: BalanceType.REAL,
  demoBalance: 1000,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    logout: () => initialUserState,
    setUser: (state, action: PayloadAction<Partial<UserState>>) => {
      Object.assign(state, action.payload);
    },
    setSelectedBalance: (state, action: PayloadAction<BalanceType>) => {
      state.selectedBalance = action.payload;
    },
    updateToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
});

export const { logout, setSelectedBalance, updateToken, setUser } = userSlice.actions;
export default userSlice.reducer;
