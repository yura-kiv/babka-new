import { privateApi } from './axios';
import type { AxiosResponse } from 'axios';
import type { ChangeUsernameResponse, ChangeAvatarResponse } from '@/types';

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
};

export default userApi;
