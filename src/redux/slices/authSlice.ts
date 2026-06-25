import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store';
import * as authService from '../../services/authService';
import {User} from '../../types/auth';

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
};

export const loginAsync = createAsyncThunk(
  'auth/login',
  async (
    credentials: {email: string; password: string},
    {rejectWithValue},
  ) => {
    try {
      const response = await authService.login(credentials.email, credentials.password);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Login failed');
    }
  },
);

export const registerAsync = createAsyncThunk(
  'auth/register',
  async (
    userData: {email: string; password: string; firstName: string; lastName: string},
    {rejectWithValue},
  ) => {
    try {
      const response = await authService.register(userData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Registration failed');
    }
  },
);

export const checkAuthAsync = createAsyncThunk(
  'auth/checkAuth',
  async (_, {rejectWithValue}) => {
    try {
      const token = await authService.getStoredToken();
      if (!token) {
        return null;
      }
      const user = await authService.validateToken(token);
      return {user, token};
    } catch (error: any) {
      return rejectWithValue(error.message || 'Auth check failed');
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: state => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      authService.clearStoredToken();
    },
    clearError: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loginAsync.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(registerAsync.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(registerAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(checkAuthAsync.pending, state => {
        state.isLoading = true;
      })
      .addCase(checkAuthAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload) {
          state.user = action.payload.user;
          state.token = action.payload.token;
          state.isAuthenticated = true;
        }
      })
      .addCase(checkAuthAsync.rejected, state => {
        state.isLoading = false;
        state.isAuthenticated = false;
      });
  },
});

export const {logout, clearError} = authSlice.actions;
export const selectUser = (state: RootState) => state.auth.user;
export const selectToken = (state: RootState) => state.auth.token;
export const selectIsLoading = (state: RootState) => state.auth.isLoading;
export const selectError = (state: RootState) => state.auth.error;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export default authSlice.reducer;
