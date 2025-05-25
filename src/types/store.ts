// User State Types
export interface UserState {
  isAuthenticated: boolean;
  token: string;
  userId: number | null;
  username: string | null;
  balance: number;
  email: string | null;
  lang: string | null;
  avatarUrl: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Game State Types
export interface GameState {
  bet: number;
  bombsCount: number;
  currentLevel: number | null;
  openedCells: number[];
  cellType: string | null;
  cellStatus: string | null;
  frontStatus: 'idle' | 'loading' | 'succeeded' | 'failed' | null;
  result: string | null;
  finalWin: number;
  endedAt: string | null;
  error: string | null;
}

// Multipliers State Types
export interface MultipliersState {
  values: Record<string, number>;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// UI State Types
export interface UIState {
  isLoading: boolean;
  errorMessage: string | null;
}

// Root State Type
export interface RootState {
  user: UserState;
  game: GameState;
  multipliers: MultipliersState;
  ui: UIState;
}

// Auth Types
export interface LoginCredentials {
  email: string;
  password: string;
  lang?: string;
}

export interface UpdateProfileData {
  username?: string;
  avatarFile?: File;
}

// Game Action Types
export interface StartGamePayload {
  bet: number;
  bombsCount: number;
}

export interface OpenCellPayload {
  level: number;
  cellIndex: number;
}

export interface StopGamePayload {
  level: number;
}
