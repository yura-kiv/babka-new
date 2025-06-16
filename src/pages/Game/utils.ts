import { DoorState } from "@/components/shared/DoorGrid";
import { CellTypeBackend, GameStatusFront, type CellNumber, type RowNumber } from "@/types";
import type { FlyingBombParams } from '@/components/shared/FlyingBomb';
import { ANIMATIONS_TYPE } from '@/constants';
import type { MultipliersResponse, BombsCount } from '@/types';

const OPEN_TYPES: Record<CellTypeBackend, DoorState> = {
  [CellTypeBackend.BOMB]: DoorState.BOMB,
  [CellTypeBackend.PRIZE]: DoorState.PRIZE,
  [CellTypeBackend.EMPTY]: DoorState.OPEN,
};

export type GameState = {
  isOk: boolean;
  status: GameStatusFront,
  level: RowNumber | null,
  bet: number,
  bombsCount: BombsCount,
  grid: Record<RowNumber, Record<CellNumber, DoorState>>,
  isLoading: boolean,
  progress: number,
  bomb: FlyingBombParams | null,
  multipliers: Partial<MultipliersResponse['data']>,
  currentAnimation: {
    loop: boolean;
    play: boolean;
    type: ANIMATIONS_TYPE;
  }
}

export enum GameActionType {
  SET_IS_OK = 'SET_IS_OK',
  START_GAME = 'START_GAME',
  STOP_GAME = 'STOP_GAME',
  SET_BET = 'SET_BET',
  SET_BOMBS_COUNT = 'SET_BOMBS_COUNT',
  OPEN_DOOR = 'OPEN_DOOR',
  SET_LEVEL = 'SET_LEVEL',
  SET_STATUS = 'SET_STATUS',
  SET_LOADING = 'SET_LOADING',
  SET_PROGRESS = 'SET_PROGRESS',
  SET_BOMB = 'SET_BOMB',
  SET_ANIMATION = 'SET_ANIMATION',
  RESET_GAME = 'RESET_GAME',
  SET_MULTIPLIERS = 'SET_MULTIPLIERS'
}

export type GameAction =
  | { type: GameActionType.SET_IS_OK; payload: boolean }
  | { type: GameActionType.START_GAME }
  | { type: GameActionType.STOP_GAME }
  | { type: GameActionType.SET_BET; payload: number }
  | { type: GameActionType.SET_BOMBS_COUNT; payload: BombsCount }
  | { type: GameActionType.OPEN_DOOR; payload: { level: RowNumber, cellId: CellNumber, state: DoorState } }
  | { type: GameActionType.SET_LEVEL; payload: RowNumber | null }
  | { type: GameActionType.SET_STATUS; payload: GameStatusFront }
  | { type: GameActionType.SET_LOADING; payload: boolean }
  | { type: GameActionType.SET_PROGRESS; payload: number }
  | { type: GameActionType.SET_BOMB; payload: FlyingBombParams | null }
  | { type: GameActionType.SET_ANIMATION; payload: { loop: boolean; play: boolean; type: ANIMATIONS_TYPE } }
  | { type: GameActionType.RESET_GAME }
  | { type: GameActionType.SET_MULTIPLIERS; payload: MultipliersResponse['data'] };

export const initialGameState: GameState = {
  isOk: true,
  status: GameStatusFront.INITIAL,
  level: null,
  bet: 0,
  bombsCount: 0,
  isLoading: false,
  progress: 0,
  multipliers: {},
  grid: {
    0: {
      0: DoorState.LOCKED,
      1: DoorState.LOCKED,
      2: DoorState.LOCKED,
      3: DoorState.LOCKED,
    },
    1: {
      0: DoorState.LOCKED,
      1: DoorState.LOCKED,
      2: DoorState.LOCKED,
      3: DoorState.LOCKED,
    },
    2: {
      0: DoorState.LOCKED,
      1: DoorState.LOCKED,
      2: DoorState.LOCKED,
      3: DoorState.LOCKED,
    },
  },
  bomb: null,
  currentAnimation: { loop: false, play: false, type: ANIMATIONS_TYPE.GRANDMA },
}

export const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case GameActionType.START_GAME:
      return {
        ...state,
        status: GameStatusFront.IN_PROGRESS,
        level: 0,
      };
    case GameActionType.STOP_GAME:
      return {
        ...state,
        status: GameStatusFront.END,
        level: null,
      };
    case GameActionType.SET_BET:
      return {
        ...state,
        bet: action.payload,
      };
    case GameActionType.SET_BOMBS_COUNT:
      return {
        ...state,
        bombsCount: action.payload,
      };
    case GameActionType.OPEN_DOOR:
      return {
        ...state,
        grid: {
          ...state.grid,
          [action.payload.level]: {
            ...state.grid[action.payload.level],
            [action.payload.cellId]: action.payload.state
          }
        }
      };
    case GameActionType.SET_LEVEL:
      return {
        ...state,
        level: action.payload,
      };
    case GameActionType.SET_STATUS:
      return {
        ...state,
        status: action.payload,
      };
    case GameActionType.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case GameActionType.SET_PROGRESS:
      return {
        ...state,
        progress: action.payload,
      };
    case GameActionType.SET_BOMB:
      return {
        ...state,
        bomb: action.payload,
      };
    case GameActionType.SET_ANIMATION:
      return {
        ...state,
        currentAnimation: action.payload,
      };
    case GameActionType.SET_MULTIPLIERS:
      return {
        ...state,
        multipliers: action.payload,
      };
    case GameActionType.RESET_GAME:
      return initialGameState;
    default:
      return state;
  }
};
