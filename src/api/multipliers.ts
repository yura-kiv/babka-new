import { publicApi } from './axios';

export const multipliersApi = {
  getMultipliers: () => {
    return publicApi.get('/users/multipliers');
  }
};

export default multipliersApi;
