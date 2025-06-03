import axios, { type AxiosError, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios';
import { API_BASE } from '@/constants';
import { store } from '@/store';
import { authApi } from '@/api/auth';
import i18n from '@/i18n/config';
import { logoutUser, updateUserToken } from '@/store/helpers/actions';

export const publicApi = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export const privateApi = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

const responseInterceptor = (response: AxiosResponse) => response;

let isRefreshing = false;
let refreshPromise: Promise<string> | null = null;

const refreshSubscribers: ((token: string) => void)[] = [];

const addRefreshSubscriber = (callback: (token: string) => void) => {
  refreshSubscribers.push(callback);
};

const onRefreshed = (token: string) => {
  refreshSubscribers.forEach(callback => callback(token));
  refreshSubscribers.length = 0;
};

const refreshTokenAndRetry = async (error: AxiosError) => {
  try {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
    
    if (!originalRequest || originalRequest._retry) {
      store.dispatch(logoutUser());
      return Promise.reject(error);
    }
    
    originalRequest._retry = true;
    
    if (isRefreshing) {
      return new Promise<AxiosResponse>((resolve, reject) => {
        addRefreshSubscriber(token => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          resolve(axios(originalRequest));
        });
      });
    }
    
    isRefreshing = true;

    refreshPromise = new Promise<string>(async (resolve, reject) => {
      try {
        const { data } = await authApi.refreshToken();
        
        if (data && data.token) {
          const newToken = data.token;
          store.dispatch(updateUserToken(newToken));
          
          onRefreshed(newToken);
          resolve(newToken);
        } else {
          store.dispatch(logoutUser());
          reject(new Error('Failed to refresh token'));
        }
      } catch (refreshError) {
        store.dispatch(logoutUser());
        reject(refreshError);
      } finally {
        isRefreshing = false;
        refreshPromise = null;
      }
    });
    
    const newToken = await refreshPromise;
    
    originalRequest.headers.Authorization = `Bearer ${newToken}`;
    
    return axios(originalRequest);
  } catch (refreshError) {
    store.dispatch(logoutUser());
    return Promise.reject(refreshError);
  }
};

const errorInterceptor = async (error: AxiosError) => {
  if (!error.response) {
    console.error('Network Error', error);
    return Promise.reject(new Error('Network error. Please check your internet connection.'));
  }

  if (error.response.status === 401) {
    const isAuthEndpoint = error.config?.url?.includes('/auth/');
    
    if (!isAuthEndpoint) {
      return refreshTokenAndRetry(error);
    } else {
      store.dispatch(logoutUser());
    }
  }
  
  switch (error.response.status) {
    case 403:
      console.error('Access denied', error);
      break;
    case 404:
      console.error('Resource not found', error);
      break;
    case 500:
      console.error('Server error', error);
      break;
    default:
      console.error('API Error', error);
  }

  return Promise.reject(error);
};

const addLanguageToRequest = (config: InternalAxiosRequestConfig) => {
  const currentLanguage = i18n.language;
  config.headers['Accept-Language'] = currentLanguage;
  
  if (config.method !== 'get') {
    config.data = config.data || {};
    if (typeof config.data === 'string') {
      try {
        const data = JSON.parse(config.data);
        config.data = JSON.stringify({ ...data, lang: currentLanguage });
      } catch (e) {
        console.error('Failed to parse request data:', e);
      }
    } else {
      config.data.lang = currentLanguage;
    }
  } else if (config.params) {
    config.params.lang = currentLanguage;
  } else {
    config.params = { lang: currentLanguage };
  }
  
  return config;
};

publicApi.interceptors.request.use(
  (config) => addLanguageToRequest(config),
  (error) => Promise.reject(error)
);

privateApi.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.user.token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return addLanguageToRequest(config);
  },
  (error) => Promise.reject(error)
);

publicApi.interceptors.response.use(responseInterceptor, errorInterceptor);
privateApi.interceptors.response.use(responseInterceptor, errorInterceptor);

export default {
  publicApi,
  privateApi,
};
