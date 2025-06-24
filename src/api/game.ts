import { privateApi } from './axios';
import type { AxiosResponse } from 'axios';
import {
  type StartGameRequest,
  type StartGameResponse,
  type OpenCellWonResponse,
  type OpenCellLostResponse,
  type OpenCellProgressResponse,
  type StopGameResponse,
  type GameStateResponse,
  BalanceType,
} from '@/types';

export const gameApi = {
  startGame: (
    data: StartGameRequest,
    balanceType: BalanceType
  ): Promise<AxiosResponse<StartGameResponse>> => {
    if (balanceType === BalanceType.DEMO) {
      return privateApi.post('/game/demo/start', data);
    }
    return privateApi.post('/game/start', data);
  },

  openCell: (
    level: number,
    cellIndex: number,
    balanceType: BalanceType
  ): Promise<
    AxiosResponse<
      OpenCellWonResponse | OpenCellLostResponse | OpenCellProgressResponse
    >
  > => {
    if (balanceType === BalanceType.DEMO) {
      return privateApi.patch(`/game/open/demo/${level}/${cellIndex}`);
    }
    return privateApi.patch(`/game/open/${level}/${cellIndex}`);
  },

  stopGame: (
    level: number,
    balanceType: BalanceType
  ): Promise<AxiosResponse<StopGameResponse>> => {
    if (balanceType === BalanceType.DEMO) {
      return privateApi.post(`/game/stop/demo/${level}`);
    }
    return privateApi.post(`/game/stop/${level}`);
  },

  getState: (): Promise<AxiosResponse<GameStateResponse>> => {
    return privateApi.get(`/game/state`);
  },
};

export default gameApi;
