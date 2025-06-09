import type { AxiosResponse } from 'axios';
import type { MultipliersResponse } from '@/types';
import { publicApi } from './axios';

export const multipliersApi = {
  getMultipliers: (): Promise<AxiosResponse<MultipliersResponse>> => {
    return publicApi.get('/users/multipliers');
  }
};

export default multipliersApi;
