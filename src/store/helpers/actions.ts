import { store } from "@/store";
import { 
  loginUser, 
  updateUserProfile, 
  logout 
} from "@/store/slices/userSlice";
import { fetchMultipliers } from "@/store/slices/multipliersSlice";
import {
  startGame,
  openCell,
  stopGame,
  resetGame,
} from "@/store/slices/gameSlice";
import type { 
  LoginCredentials, 
  UpdateProfileData, 
  StartGamePayload 
} from "@/types/store";

// --- AUTH & USER ---
export const authenticateUser = (credentials: LoginCredentials) =>
  store.dispatch(loginUser(credentials));

export const logoutUser = () => store.dispatch(logout());

export const updateUserData = (data: UpdateProfileData) => 
  store.dispatch(updateUserProfile(data));

// --- MULTIPLIERS ---
export const loadMultipliers = () => store.dispatch(fetchMultipliers());

// --- GAME ---
export const initGame = (payload: StartGamePayload) => 
  store.dispatch(startGame(payload));

export const revealCell = (lvl: number, cell: number) =>
  store.dispatch(openCell({ level: lvl, cellIndex: cell }));

export const cashOut = (lvl: number) => 
  store.dispatch(stopGame({ level: lvl }));

export const resetGameState = () => 
  store.dispatch(resetGame());
