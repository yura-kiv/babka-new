import { publicApi, privateApi } from './axios';
import authApi from './auth';
import userApi from './user';
import gameApi from './game';
import multipliersApi from './multipliers';

const api = {
  public: publicApi,
  private: privateApi,

  auth: authApi,
  user: userApi,
  game: gameApi,
  multipliers: multipliersApi,
};

export {
  publicApi,
  privateApi,
  authApi,
  userApi,
  gameApi,
  multipliersApi,
};

export default api;
