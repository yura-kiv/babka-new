import { privateApi } from './axios';
import type { AxiosResponse } from 'axios';
import type {
  ChangeUsernameResponse,
  ChangeAvatarResponse,
  GetBalanceResponse,
  UserInfoResponse,
} from '@/types';

export const userApi = {
  changeUsername: (
    newUsername: string
  ): Promise<AxiosResponse<ChangeUsernameResponse>> => {
    return privateApi.patch('/user/username', { newUsername });
  },

  changeAvatar: (
    avatarFile: File
  ): Promise<AxiosResponse<ChangeAvatarResponse>> => {
    const formData = new FormData();
    if (avatarFile) formData.append('avatar', avatarFile);
    return privateApi.patch('/user/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  getBalance: (): Promise<AxiosResponse<GetBalanceResponse>> => {
    return privateApi.get('/user/balance');
  },

  getUserInfo: (): Promise<AxiosResponse<UserInfoResponse>> => {
    return privateApi.get('/user/info');
  },
};

export default userApi;
