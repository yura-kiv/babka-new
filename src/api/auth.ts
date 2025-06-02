import { publicApi, privateApi } from './axios';
import type { LoginCredentials, RegisterCredentials } from '@/types/store';

export const authApi = {
  login: (credentials: LoginCredentials) => {
    return publicApi.post('/auth/login', credentials);
  },

  register: (userData: RegisterCredentials) => {
    return publicApi.post('/auth/register', userData);
  },

  refreshToken: () => {
    return privateApi.post('/auth/refresh');
  },
  
  logout: () => {
    return privateApi.post('/auth/logout');
  }
};

export default authApi;
