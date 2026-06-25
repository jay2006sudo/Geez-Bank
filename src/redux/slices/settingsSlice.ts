import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store';

interface SettingsState {
  theme: 'light' | 'dark';
  language: string;
  biometricEnabled: boolean;
  notificationsEnabled: boolean;
  currency: string;
}

const initialState: SettingsState = {
  theme: 'light',
  language: 'en',
  biometricEnabled: false,
  notificationsEnabled: true,
  currency: 'USD',
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
    },
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
    setBiometric: (state, action: PayloadAction<boolean>) => {
      state.biometricEnabled = action.payload;
    },
    setNotifications: (state, action: PayloadAction<boolean>) => {
      state.notificationsEnabled = action.payload;
    },
    setCurrency: (state, action: PayloadAction<string>) => {
      state.currency = action.payload;
    },
  },
});

export const {setTheme, setLanguage, setBiometric, setNotifications, setCurrency} =
  settingsSlice.actions;

export const selectTheme = (state: RootState) => state.settings.theme;
export const selectLanguage = (state: RootState) => state.settings.language;
export const selectBiometric = (state: RootState) => state.settings.biometricEnabled;
export const selectNotifications = (state: RootState) => state.settings.notificationsEnabled;
export const selectCurrency = (state: RootState) => state.settings.currency;

export default settingsSlice.reducer;
