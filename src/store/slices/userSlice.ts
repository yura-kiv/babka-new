import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { LoginCredentials, UpdateProfileData, UserState } from "@/types/store";

const API_BASE = "http://localhost:3000";

// Async thunk for login
export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password, lang }: LoginCredentials, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${API_BASE}/auth/login`, {
        email,
        password,
        lang,
      });
      return data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Login failed");
    }
  }
);

// Async thunk for updating profile
export const updateUserProfile = createAsyncThunk(
  "user/updateProfile",
  async ({ username, avatarFile }: UpdateProfileData, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { user: UserState };
      const token = state.user.token;
      
      const formData = new FormData();
      if (username) formData.append("username", username);
      if (avatarFile) formData.append("avatar", avatarFile);
      
      const { data } = await axios.patch(`${API_BASE}/users/me`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
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
};

const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    logout: () => initialUserState,
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

export const { logout } = userSlice.actions;
export default userSlice.reducer;
