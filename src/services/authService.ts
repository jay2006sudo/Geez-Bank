import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';
import {User, AuthResponse} from '../types/auth';
import {getApiClient} from './apiClient';

const STORAGE_TOKEN_KEY = '@geez_bank_token';
const STORAGE_USER_KEY = '@geez_bank_user';

export const login = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    const response = await getApiClient().post('/auth/login', {
      email,
      password,
    });
    const {user, token} = response.data;
    await storeToken(token);
    await storeUser(user);
    return {user, token};
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

export const register = async (userData: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}): Promise<AuthResponse> => {
  try {
    const response = await getApiClient().post('/auth/register', userData);
    const {user, token} = response.data;
    await storeToken(token);
    await storeUser(user);
    return {user, token};
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Registration failed');
  }
};

export const validateToken = async (token: string): Promise<User> => {
  try {
    const response = await getApiClient().get('/auth/validate', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.user;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Token validation failed');
  }
};

export const refreshToken = async (token: string): Promise<string> => {
  try {
    const response = await getApiClient().post('/auth/refresh', {token});
    const newToken = response.data.token;
    await storeToken(newToken);
    return newToken;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Token refresh failed');
  }
};

export const storeToken = async (token: string): Promise<void> => {
  try {
    await EncryptedStorage.setItem(STORAGE_TOKEN_KEY, token);
  } catch (error) {
    console.error('Failed to store token:', error);
  }
};

export const getStoredToken = async (): Promise<string | null> => {
  try {
    return await EncryptedStorage.getItem(STORAGE_TOKEN_KEY);
  } catch (error) {
    console.error('Failed to retrieve token:', error);
    return null;
  }
};

export const clearStoredToken = async (): Promise<void> => {
  try {
    await EncryptedStorage.removeItem(STORAGE_TOKEN_KEY);
  } catch (error) {
    console.error('Failed to clear token:', error);
  }
};

export const storeUser = async (user: User): Promise<void> => {
  try {
    await EncryptedStorage.setItem(STORAGE_USER_KEY, JSON.stringify(user));
  } catch (error) {
    console.error('Failed to store user:', error);
  }
};

export const getStoredUser = async (): Promise<User | null> => {
  try {
    const userJson = await EncryptedStorage.getItem(STORAGE_USER_KEY);
    return userJson ? JSON.parse(userJson) : null;
  } catch (error) {
    console.error('Failed to retrieve user:', error);
    return null;
  }
};
