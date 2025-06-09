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

export interface MultipliersState {
  values: Record<string, number>;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

export interface UIState {
  isLoading: boolean;
  isMuted: boolean;
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
  isDemo: boolean;
}

export enum BalanceType {
  REAL = "real",
  DEMO = "demo",
}

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
  data: {
    accessToken: string;
  };
  message: string;
  status: number;
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

export interface ResendActivationEmailResponse {
}

export interface MultipliersResponse {
  message: string;
  data: {
    "1": number,
    "2": number,
    "3": number
  }
}

export enum GameResultBackend {
  IN_PROGRESS = "in_progress",
  LOST = "lost",
  WON = "won",
  CANCELED = "canceled",
  CASHED_OUT = "cashed_out"
}

export enum CellTypeBackend {
  PRIZE = "prize",
  BOMB = "bomb",
  EMPTY = "empty"
}

export enum CellStatusBackend {
  CLOSED = "closed",
  OPEN = "open"
}

export enum GameStatusFront {
  PROGRESS = "progress",
  INITIAL = "initial",
  END = "end",
}

export type RowNumber = 0 | 1 | 2;

export interface GameState {
  bet: number;
  bombsCount: number;
  activeRow: RowNumber | null;
  status: GameStatusFront;
  mode: BalanceType;
  openedCells: {
    [key in RowNumber]: { id: number, type: CellTypeBackend }[];
  };
  isLoading: boolean;
}

export interface StartGameResponse {
  bet: number;
  bombsCount: number;
  currentLevel: string;
  finalWin: number;
  message: string;
  result: GameResultBackend;
  isDemo?: boolean;
}

export interface StopGameResponse {
  finalWin: number;
  gameEnd: string;
  gameStatus: GameResultBackend;
  message: string;
}

export interface OpenCellResponse {
  message: string;
  gameStatus?: GameResultBackend;
  cellType?: CellTypeBackend;
  cellStatus?: CellStatusBackend;
  currentLevel?: number;
  finalWin?: number;
  gameEnd?: string;
}
