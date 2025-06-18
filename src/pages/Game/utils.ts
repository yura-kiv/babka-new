import { DoorState } from '@/components/shared/DoorGrid';
import { type AnimationSegment } from 'lottie-web';
import { ANIMATIONS_TYPE } from '@/constants';
import { type FlyingBombParams } from '@/components/shared/FlyingBomb';
import {
  type MultipliersResponse,
  type BombsCount,
  type GameStateResponse,
  type CellNumber,
  type RowNumber,
  type BoardResponseState,
  GameStatusFront,
  CellStatusResponse,
  CellTypeResponse,
} from '@/types';

export type GameState = {
  isOk: boolean;
  status: GameStatusFront;
  level: RowNumber | null;
  bet: number;
  bombsCount: BombsCount;
  grid: Record<RowNumber, Record<CellNumber, DoorState>>;
  isLoading: boolean;
  isProcessing: boolean;
  progress: number;
  bomb: FlyingBombParams | null;
  multipliers: Partial<MultipliersResponse['data']>;
  currentAnimation: {
    loop: boolean;
    play: boolean;
    type: ANIMATIONS_TYPE;
    segment?: AnimationSegment | AnimationSegment[] | undefined;
  };
};

export enum GameActionType {
  SET_IS_OK = 'SET_IS_OK',
  START_GAME = 'START_GAME',
  CONTINUE_GAME = 'CONTINUE_GAME',
  SET_BET = 'SET_BET',
  SET_BOMBS_COUNT = 'SET_BOMBS_COUNT',
  OPEN_DOOR = 'OPEN_DOOR',
  SET_LEVEL = 'SET_LEVEL',
  SET_STATUS = 'SET_STATUS',
  SET_PROCESSING = 'SET_PROCESSING',
  SET_LOADING = 'SET_LOADING',
  SET_PROGRESS = 'SET_PROGRESS',
  SET_BOMB = 'SET_BOMB',
  SET_ANIMATION = 'SET_ANIMATION',
  RESET_GAME = 'RESET_GAME',
  SET_MULTIPLIERS = 'SET_MULTIPLIERS',
}

export type GameAction =
  | { type: GameActionType.SET_IS_OK; payload: boolean }
  | { type: GameActionType.START_GAME }
  | { type: GameActionType.CONTINUE_GAME; payload: GameStateResponse }
  | { type: GameActionType.SET_BET; payload: number }
  | { type: GameActionType.SET_BOMBS_COUNT; payload: BombsCount }
  | {
      type: GameActionType.OPEN_DOOR;
      payload: {
        level: RowNumber;
        cellId: CellNumber;
        type: CellTypeResponse;
        newLevel?: RowNumber;
      };
    }
  | { type: GameActionType.SET_LEVEL; payload: RowNumber | null }
  | { type: GameActionType.SET_STATUS; payload: GameStatusFront }
  | { type: GameActionType.SET_PROCESSING; payload: boolean }
  | { type: GameActionType.SET_LOADING; payload: boolean }
  | { type: GameActionType.SET_PROGRESS; payload: number }
  | { type: GameActionType.SET_BOMB; payload: FlyingBombParams | null }
  | {
      type: GameActionType.SET_ANIMATION;
      payload: {
        loop: boolean;
        play: boolean;
        type: ANIMATIONS_TYPE;
        segment?: AnimationSegment | AnimationSegment[] | undefined;
      };
    }
  | { type: GameActionType.RESET_GAME }
  | {
      type: GameActionType.SET_MULTIPLIERS;
      payload: MultipliersResponse['data'];
    };

export const initialGameState: GameState = {
  isOk: true,
  status: GameStatusFront.INITIAL,
  level: null,
  bet: 0,
  bombsCount: 0,
  isLoading: false,
  isProcessing: false,
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
  currentAnimation: {
    loop: true,
    play: true,
    type: ANIMATIONS_TYPE.GRANDMA,
    segment: [0, 23],
  },
};

const CELL_TYPE_RESPONSE_TO_DOOR_STATE: Record<CellTypeResponse, DoorState> = {
  [CellTypeResponse.PRIZE]: DoorState.PRIZE,
  [CellTypeResponse.BOMB]: DoorState.BOMB,
  [CellTypeResponse.EMPTY]: DoorState.OPEN,
};

const convertBoardResToState = (
  board: BoardResponseState,
  level: RowNumber
): GameState['grid'] => {
  let grid: GameState['grid'] = JSON.parse(
    JSON.stringify(initialGameState.grid)
  );
  board.forEach((row, rowIndex) => {
    row.forEach((cell, cellIndex) => {
      const rowNumber = rowIndex as RowNumber;
      const cellNumber = cellIndex as CellNumber;
      if (rowNumber > level) {
        grid[rowNumber][cellNumber] = DoorState.LOCKED;
      }
      if (rowNumber <= level) {
        if (!cell.type) {
          grid[rowNumber][cellNumber] = DoorState.CLOSED;
          return;
        }
        if (cell.status === CellStatusResponse.OPEN) {
          grid[rowNumber][cellNumber] =
            CELL_TYPE_RESPONSE_TO_DOOR_STATE[cell.type];
        }
        if (cell.status === CellStatusResponse.CLOSED) {
          grid[rowNumber][cellNumber] = DoorState.CLOSED;
        }
      }
    });
  });
  return grid;
};

export const gameReducer = (
  state: GameState,
  action: GameAction
): GameState => {
  switch (action.type) {
    case GameActionType.START_GAME:
      return {
        ...state,
        level: 0,
        status: GameStatusFront.IN_PROGRESS,
        grid: {
          ...initialGameState.grid,
          [0]: {
            [0]: DoorState.CLOSED,
            [1]: DoorState.CLOSED,
            [2]: DoorState.CLOSED,
            [3]: DoorState.CLOSED,
          },
        },
      };
    case GameActionType.CONTINUE_GAME: {
      const { board, currentLevel } = action.payload;
      const levelNumber = Number(currentLevel) as RowNumber;
      const gridState = convertBoardResToState(board, levelNumber);
      return {
        ...state,
        level: levelNumber,
        grid: gridState,
        progress: 0, // to do
        bet: 0, // to do
        bombsCount: 0, // to do
        status: GameStatusFront.IN_PROGRESS,
      };
    }
    case GameActionType.OPEN_DOOR: {
      const { level, cellId, type, newLevel } = action.payload;
      if (newLevel && level !== newLevel) {
        return {
          ...state,
          level: newLevel,
          grid: {
            ...state.grid,
            [level]: {
              ...state.grid[level],
              [cellId]: CELL_TYPE_RESPONSE_TO_DOOR_STATE[type],
            },
            [newLevel as RowNumber]: {
              [0]: DoorState.CLOSED,
              [1]: DoorState.CLOSED,
              [2]: DoorState.CLOSED,
              [3]: DoorState.CLOSED,
            },
          },
        };
      }
      return {
        ...state,
        level,
        grid: {
          ...state.grid,
          [level]: {
            ...state.grid[level],
            [cellId]: CELL_TYPE_RESPONSE_TO_DOOR_STATE[type],
          },
        },
      };
    }
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
    case GameActionType.SET_PROCESSING:
      return {
        ...state,
        isProcessing: action.payload,
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
