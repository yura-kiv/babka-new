import { publicApi, privateApi } from './axios';
import type { AxiosResponse } from 'axios';
import type {
  LoginCredentials,
  RegisterCredentials,
  ChangePasswordData,
  ResetPasswordData,
  LoginResponse,
  RegisterResponse,
  RefreshTokenResponse,
  LogoutResponse,
  ForgotPasswordResponse,
  ResetPasswordResponse,
  ChangePasswordResponse
} from '@/types';

export const authApi = {
  login: (credentials: LoginCredentials): Promise<AxiosResponse<LoginResponse>> => {
    return publicApi.post<LoginResponse>('/auth/login', credentials);
  },

  register: (userData: RegisterCredentials): Promise<AxiosResponse<RegisterResponse>> => {
    return publicApi.post<RegisterResponse>('/auth/register', userData);
  },

  refreshToken: (): Promise<AxiosResponse<RefreshTokenResponse>> => {
    return privateApi.post<RefreshTokenResponse>('/auth/refresh');
  },
  
  logout: (): Promise<AxiosResponse<LogoutResponse>> => {
    return privateApi.post<LogoutResponse>('/auth/logout');
  },

  forgotPassword: (email: string): Promise<AxiosResponse<ForgotPasswordResponse>> => {
    return publicApi.post<ForgotPasswordResponse>('/auth/forgotPassword', { email });
  },

  resetPassword: (data: ResetPasswordData): Promise<AxiosResponse<ResetPasswordResponse>> => {
    return publicApi.post<ResetPasswordResponse>('/auth/resetPassword', data);
  },

  changePassword: (data: ChangePasswordData): Promise<AxiosResponse<ChangePasswordResponse>> => {
    return privateApi.post<ChangePasswordResponse>('/auth/changePassword', data);
  }
};

export default authApi;
