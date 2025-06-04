export interface UserState {
  isAuthenticated: boolean;
  token: string;
  userId: string | null;
  username: string | null;
  balance: number;
  email: string | null;
  avatarUrl: string | null;
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

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
}

export interface ResetPasswordData {
  password: string;
  token: string;
}

export interface LoginResponse {
  status: number;
  message: string;
  data: {
    accessToken: string;
  };
  userData: {
    name: string;
    email: string;
    balance: string;
    avatar: string | null;
  };
}

export interface DecodedToken {
  email: string;
  exp: number;
  iat: number;
  id: string;
  username: string;
}

export interface RegisterResponse {
  accessToken: string;
  status: number;
}

export interface RefreshTokenResponse {
  token: string;
}

export interface LogoutResponse {
  message: string;
}

export interface ForgotPasswordResponse {
  message: string,
  status: number,
}

export interface ResetPasswordResponse {
  message: string;
}

export interface ChangePasswordResponse {
  message: string;
}

export interface ChangeUsernameResponse {
  data: string;
  message: string;
  status: number;
}

export interface ChangeAvatarResponse {
  data: {
    avatarUrl: string;
  };
  message: string;
  status: number;
}
