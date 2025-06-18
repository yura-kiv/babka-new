import { privateApi } from './axios';
import type { AxiosResponse } from 'axios';
import type {
  StartGameRequest,
  StartGameResponse,
  OpenCellWonResponse,
  OpenCellLostResponse,
  OpenCellProgressResponse,
  StopGameResponse,
  GameStateResponse
} from '@/types';

export const gameApi = {
  startGame: (data: StartGameRequest): Promise<AxiosResponse<StartGameResponse>> => {
    return privateApi.post('/game/start', data);
  },

  openCell: (level: number, cellIndex: number): Promise<AxiosResponse<
    OpenCellWonResponse
    | OpenCellLostResponse
    | OpenCellProgressResponse
  >> => {
    return privateApi.patch(`/game/open/${level}/${cellIndex}`);
  },

  stopGame: (level: number): Promise<AxiosResponse<StopGameResponse>> => {
    return privateApi.post(`/game/stop/${level}`);
  },

  getState: (): Promise<AxiosResponse<GameStateResponse>> => {
    return privateApi.get(`/game/state`);
  },
};

export default gameApi;
