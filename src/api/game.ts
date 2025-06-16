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
  startGame: (data: StartGameRequest, isDemo: boolean = false): Promise<AxiosResponse<StartGameResponse>> => {
    if (isDemo) {
      return privateApi.post('/game/demo/start', data);
    }
    return privateApi.post('/game/start', data);
  },

  openCell: (level: number, cellIndex: number, isDemo: boolean = false): Promise<AxiosResponse<
    OpenCellWonResponse
    | OpenCellLostResponse
    | OpenCellProgressResponse
  >> => {
    if (isDemo) {
      return privateApi.patch(`/game/open/demo/${level}/${cellIndex}`);
    }
    return privateApi.patch(`/game/open/${level}/${cellIndex}`);
  },

  stopGame: (level: number, isDemo: boolean = false): Promise<AxiosResponse<StopGameResponse>> => {
    if (isDemo) {
      return privateApi.post(`/game/stop/demo/${level}`);
    }
    return privateApi.post(`/game/stop/${level}`);
  },

  getState: (): Promise<AxiosResponse<GameStateResponse>> => {
    return privateApi.post(`/game/state`);
  },
};

export default gameApi;
