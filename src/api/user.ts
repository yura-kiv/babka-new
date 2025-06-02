import { privateApi } from './axios';
import type { UpdateProfileData } from '@/types/store';

export const userApi = {
  updateProfile: (data: UpdateProfileData) => {
    const formData = new FormData();
    
    if (data.username) formData.append("username", data.username);
    if (data.avatarFile) formData.append("avatar", data.avatarFile);
    
    return privateApi.patch('/users/me', formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
};

export default userApi;
