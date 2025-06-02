import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { LoginCredentials, UpdateProfileData, UserState } from "@/types/store";
import { authApi, userApi } from "@/api";

export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      const { data } = await authApi.login(credentials);
      return data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Login failed");
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "user/updateProfile",
  async (profileData: UpdateProfileData, { rejectWithValue }) => {
    try {
      const { data } = await userApi.updateProfile(profileData);
      return data.user;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Profile update failed");
    }
  }
);

const initialUserState: UserState = {
  // auth
  isAuthenticated: false,
  token: "",
  userId: null,
  // profile
  username: null,
  balance: 0,
  email: null,
  lang: null,
  avatarUrl: null,
  status: "idle",
  error: null,
  // demo balance
  selectedBalance: 'real',
  demoBalance: 1000,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    logout: () => initialUserState,
    setSelectedBalance: (state, action: PayloadAction<'real' | 'demo'>) => {
      state.selectedBalance = action.payload;
    },
    updateToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        // auth data
        state.isAuthenticated = true;
        state.token = payload.token;
        state.userId = payload.user.id;
        state.lang = payload.user.lang;
        // profile data
        state.username = payload.user.username;
        state.email = payload.user.email;
        state.balance = payload.user.balance;
        state.avatarUrl = payload.user.avatarUrl;
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = payload as string;
      })
      // UPDATE PROFILE
      .addCase(updateUserProfile.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        state.username = payload.username;
        state.avatarUrl = payload.avatarUrl;
      })
      .addCase(updateUserProfile.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = payload as string;
      });
  },
});

export const { logout, setSelectedBalance, updateToken } = userSlice.actions;
export default userSlice.reducer;
