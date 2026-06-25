import {configureStore} from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import accountReducer from './slices/accountSlice';
import transactionReducer from './slices/transactionSlice';
import settingsReducer from './slices/settingsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    account: accountReducer,
    transaction: transactionReducer,
    settings: settingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
