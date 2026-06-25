import axios, {AxiosInstance} from 'axios';
import * as authService from './authService';

const API_BASE_URL = process.env.API_BASE_URL || 'https://api.geezbank.com';
const API_VERSION = 'v1';

let apiClient: AxiosInstance | null = null;

export const getApiClient = (): AxiosInstance => {
  if (!apiClient) {
    apiClient = axios.create({
      baseURL: `${API_BASE_URL}/${API_VERSION}`,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    // Request interceptor to add token
    apiClient.interceptors.request.use(
      async config => {
        const token = await authService.getStoredToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      error => Promise.reject(error),
    );

    // Response interceptor to handle token refresh
    apiClient.interceptors.response.use(
      response => response,
      async error => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
            const token = await authService.getStoredToken();
            if (token) {
              const newToken = await authService.refreshToken(token);
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
              return apiClient!(originalRequest);
            }
          } catch (refreshError) {
            await authService.clearStoredToken();
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      },
    );
  }

  return apiClient;
};

export const resetApiClient = (): void => {
  apiClient = null;
};
