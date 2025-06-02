import { privateApi } from './axios';
import type { StartGamePayload } from '@/types/store';

export const gameApi = {
  startGame: (data: StartGamePayload) => {
    return privateApi.post('/game/start', data);
  },

  openCell: (level: number, cellIndex: number) => {
    return privateApi.patch(`/game/open/${level}/${cellIndex}`);
  },

  stopGame: (level: number) => {
    return privateApi.post(`/game/stop/${level}`);
  }
};

export default gameApi;
