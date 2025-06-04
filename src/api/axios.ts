import axios, { type AxiosError, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios';
import { API_BASE } from '@/constants';
import { store } from '@/store';
import { authApi } from '@/api/auth';
import i18n from '@/i18n/config';
import { logoutUser, updateUserToken } from '@/store/helpers/actions';
import { jwtDecode } from 'jwt-decode';
import { type DecodedToken } from '@/types';

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

const isTokenExpired = (token: string): boolean => {
  try {
    const decoded = jwtDecode<DecodedToken>(token);
    const currentTime = Date.now() / 1000;
    
    return !decoded.exp || decoded.exp < (currentTime + 30);
  } catch (error) {
    console.error('Error decoding token:', error);
    return true;
  }
};

const getTokenFromStore = (): string | null => {
  const state = store.getState();
  return state.user.token || null;
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

const responseInterceptor = (response: AxiosResponse) => response;

const errorInterceptor = async (error: AxiosError) => {
  if (!error.response) {
    console.error('Network Error', error);
    return Promise.reject(new Error('Network error. Please check your internet connection.'));
  }

  if (error.response.status === 401) {
    store.dispatch(logoutUser());
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

publicApi.interceptors.request.use(
  (config) => addLanguageToRequest(config),
  (error) => Promise.reject(error)
);

privateApi.interceptors.request.use(
  async (config) => {
    const token = getTokenFromStore();

    if (token) {
      if (isTokenExpired(token)) {
        if (!isRefreshing) {
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
              console.error('Failed to refresh token:', refreshError);
              store.dispatch(logoutUser());
              reject(refreshError);
            } finally {
              isRefreshing = false;
            }
          });
        }
        
        try {
          if (refreshPromise) {
            const newToken = await refreshPromise;
            config.headers.Authorization = `Bearer ${newToken}`;
          } else {
            return new Promise((resolve) => {
              addRefreshSubscriber((token) => {
                config.headers.Authorization = `Bearer ${token}`;
                resolve(config);
              });
            });
          }
        } catch (error) {
          console.error('Error waiting for token refresh:', error);
        } finally {
          if (!isRefreshing) {
            refreshPromise = null;
          }
        }
      } else {
        config.headers.Authorization = `Bearer ${token}`;
      }
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
