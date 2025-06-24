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
  REAL = 'real',
  DEMO = 'demo',
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
    demoBalance: string;
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
  message: string;
  status: number;
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

export interface ResendActivationEmailResponse {}

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
  INITIAL = 'INITIAL',
  IN_PROGRESS = 'IN_PROGRESS',
  WON = 'WON',
  LOST = 'LOST',
  STOPPED = 'STOPPED',
}

export enum GameResultResponse {
  IN_PROGRESS = 'in_progress',
  LOST = 'lost',
  WON = 'won',
  CANCELED = 'canceled',
  CASHED_OUT = 'cashed_out',
}

export enum CellTypeResponse {
  PRIZE = 'prize',
  BOMB = 'bomb',
  EMPTY = 'empty',
}

export enum CellStatusResponse {
  CLOSED = 'closed',
  OPEN = 'open',
}

export interface CellResponse {
  status: CellStatusResponse;
  type?: CellTypeResponse;
  posX: number;
  posY: number;
}

export type BoardResponseState = CellResponse[][];

export interface StartGameResponse {
  message: string;
  bet: number;
  bombsCount: number;
  currentLevel: string;
  result: GameResultResponse;
  finalWin: number;
  isDemo?: boolean;
}

export interface StopGameResponse {
  message: string;
  gameStatus: GameResultResponse;
  finalWin: number;
  gameEnd: string; // ISO date string
}

export interface GameStateResponse {
  message: string;
  gameStatus: GameResultResponse;
  currentLevel: number;
  finalWin: number;
  board: BoardResponseState;
  bombsCount: number;
  bet: string;
}

export interface OpenCellLostResponse {
  message: string;
  cellType: CellTypeResponse;
  gameStatus: GameResultResponse.LOST;
  finalWin: number;
  gameEnd: string; // ISO date string
}

export interface OpenCellProgressResponse {
  message: string;
  gameStatus: GameResultResponse.IN_PROGRESS;
  cellType: CellTypeResponse;
  cellStatus: CellStatusResponse;
  currentLevel: number;
}

export interface OpenCellWonResponse {
  message: string;
  gameStatus: GameResultResponse.WON;
  finalWin: number;
  gameEnd: string; // ISO date string
}
