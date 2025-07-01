import axios, {
  type AxiosError,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios';
import { API_BASE, Pages } from '@/constants';
import { store } from '@/store';
import i18n from '@/i18n/config';
import { logoutUser, updateUserToken } from '@/store/helpers/actions';
import { jwtDecode } from 'jwt-decode';
import { type DecodedToken, type RefreshTokenResponse } from '@/types';
import authApi from './auth';

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

const refreshTokenApi = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

const logout = () => {
  store.dispatch(logoutUser());
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

const getTokenFromStore = (): string | null => {
  const state = store.getState();
  return state.user.token || null;
};

const isTokenExpired = (token: string): boolean => {
  try {
    const decoded = jwtDecode<DecodedToken>(token);
    const currentTime: number = Math.floor(Date.now() / 1000) - 1;
    return !decoded.exp || decoded.exp < currentTime;
  } catch (error) {
    console.error('Error decoding token:', error);
    return true;
  }
};

let refreshTokenPromise: Promise<string | null> | null = null;
const pendingRequestsQueue: ((token: string | null) => void)[] = [];

const processPendingRequests = (newToken: string | null) => {
  pendingRequestsQueue.forEach((callback) => callback(newToken));
  pendingRequestsQueue.length = 0;
};

const refreshToken = async (): Promise<string | null> => {
  try {
    const token = getTokenFromStore();
    if (!token) return null;
    const response = await refreshTokenApi.post<RefreshTokenResponse>(
      '/auth/refresh',
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const newToken = response.data.data.accessToken;
    store.dispatch(updateUserToken(newToken));
    return newToken;
  } catch (error) {
    console.error('Error refreshing token:', error);
    await authApi.logout();
    logout();
    return null;
  }
};

publicApi.interceptors.request.use(
  (config) => addLanguageToRequest(config),
  (error) => Promise.reject(error)
);

refreshTokenApi.interceptors.request.use(
  (config) => addLanguageToRequest(config),
  (error) => Promise.reject(error)
);

privateApi.interceptors.request.use(
  async (config) => {
    const token = getTokenFromStore();
    if (!token) {
      return addLanguageToRequest(config);
    }
    const tokenExpired = isTokenExpired(token);
    if (!tokenExpired) {
      config.headers.Authorization = `Bearer ${token}`;
      return addLanguageToRequest(config);
    }
    if (!refreshTokenPromise) {
      refreshTokenPromise = refreshToken()
        .then((newToken) => {
          processPendingRequests(newToken);
          return newToken;
        })
        .catch((error) => {
          processPendingRequests(null);
          throw error;
        })
        .finally(() => {
          refreshTokenPromise = null;
        });
    }
    return new Promise((resolve, reject) => {
      pendingRequestsQueue.push((newToken: string | null) => {
        if (newToken) {
          config.headers.Authorization = `Bearer ${newToken}`;
          resolve(addLanguageToRequest(config));
        } else {
          reject(new Error('Unable to refresh token'));
        }
      });
    });
  },
  (error) => Promise.reject(error)
);

const responseInterceptor = (response: AxiosResponse) => response;

const errorInterceptor = async (error: AxiosError) => {
  if (!error.response) {
    console.error('Network Error', error);
    return Promise.reject(
      new Error('Network error. Please check your internet connection.')
    );
  }
  return Promise.reject(error);
};

publicApi.interceptors.response.use(responseInterceptor, errorInterceptor);
refreshTokenApi.interceptors.response.use(
  responseInterceptor,
  errorInterceptor
);
privateApi.interceptors.response.use(responseInterceptor, errorInterceptor);

export default {
  publicApi,
  privateApi,
};
