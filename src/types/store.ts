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
  // optional
  selectedBalance: BalanceType;
  demoBalance: number;
}

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

export interface MultipliersState {
  values: Record<string, number>;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

export interface UIState {
  isLoading: boolean;
  errorMessage: string | null;
  isMuted: boolean;
}

export interface RootState {
  user: UserState;
  game: GameState;
  multipliers: MultipliersState;
  ui: UIState;
}

export interface LoginCredentials {
  username?: string;
  email: string;
  password: string;
  lang?: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  username: string;
  lang?: string;
  agreeToTerms?: boolean;
}

export interface UpdateProfileData {
  username?: string;
  avatarFile?: File;
}

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

export type BalanceType = 'real' | 'demo';
