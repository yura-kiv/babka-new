import { privateApi } from './axios';
import type { StartGamePayload } from "@/types";
import type { AxiosResponse } from 'axios';
import type { StartGameResponse, OpenCellResponse, StopGameResponse } from '@/types';

export const gameApi = {
  startGame: (data: StartGamePayload): Promise<AxiosResponse<StartGameResponse>> => {
    return privateApi.post('/game/start', data);
  },

  openCell: (level: number, cellIndex: number): Promise<AxiosResponse<OpenCellResponse>> => {
    return privateApi.patch(`/game/open/${level}/${cellIndex}`);
  },

  stopGame: (level: number): Promise<AxiosResponse<StopGameResponse>> => {
    return privateApi.post(`/game/stop/${level}`);
  },
};

export default gameApi;
