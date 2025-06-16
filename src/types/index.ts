export interface UserState {
  isConfirmed: boolean;
  token: string;
  userId: string | null;
  username: string | null;
  balance: number;
  email: string | null;
  avatarUrl: string | null;
  // front additional fields
  selectedBalance: BalanceType;
  demoBalance: number;
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

export interface StartGameRequest {
  bet: number;
  bombsCount: number;
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

export type MultipliersBombsCount = 1 | 2 | 3;
export type MultipliersRows = 1 | 2 | 3;
export type BombsCount = 0 | 1 | 2 | 3;
export interface MultipliersResponse {
  message: string;
  data: Record<MultipliersBombsCount, Record<MultipliersRows, number>>;
}

export type RowNumber = 0 | 1 | 2;

export type CellNumber = 0 | 1 | 2 | 3;

export enum GameStatusFront {
  INITIAL = "INITIAL",
  IN_PROGRESS = "IN_PROGRESS",
  END = "END",
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

export interface Cell {
  status: CellStatusBackend;
  type?: CellTypeBackend;
  posX: number;
  posY: number;
}

export type BoardState = Cell[][];

export interface StartGameResponse {
  message: string;
  bet: number;
  bombsCount: number;
  currentLevel: string;
  result: GameResultBackend;
  finalWin: number;
  isDemo?: boolean;
}

export interface StopGameResponse {
  message: string;
  gameStatus: GameResultBackend;
  finalWin: number;
  gameEnd: string; // ISO date string
}

export interface GameStateResponse {
  message: string;
  gameStatus: GameResultBackend;
  currentLevel: number;
  finalWin: number;
  board: BoardState;
}

export interface OpenCellLostResponse {
  message: string;
  cellType: "prize" | "bomb" | "empty";
  gameStatus: "lost";
  finalWin: number;
  gameEnd: string; // ISO date string
}

export interface OpenCellProgressResponse {
  message: string;
  gameStatus: "in_progress";
  cellType: "prize" | "bomb" | "empty";
  cellStatus: "open" | "closed";
  currentLevel: number;
}

export interface OpenCellWonResponse {
  message: string;
  gameStatus: "won";
  finalWin: number;
  gameEnd: string; // ISO date string
}
