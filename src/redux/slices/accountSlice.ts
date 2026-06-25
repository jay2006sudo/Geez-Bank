import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {RootState} from '../store';
import * as accountService from '../../services/accountService';
import {Account} from '../../types/account';

interface AccountState {
  accounts: Account[];
  selectedAccount: Account | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AccountState = {
  accounts: [],
  selectedAccount: null,
  isLoading: false,
  error: null,
};

export const fetchAccountsAsync = createAsyncThunk(
  'account/fetchAccounts',
  async (_, {rejectWithValue}) => {
    try {
      const accounts = await accountService.getAccounts();
      return accounts;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch accounts');
    }
  },
);

export const fetchAccountDetailsAsync = createAsyncThunk(
  'account/fetchDetails',
  async (accountId: string, {rejectWithValue}) => {
    try {
      const account = await accountService.getAccountDetails(accountId);
      return account;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch account details');
    }
  },
);

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    selectAccount: (state, action) => {
      state.selectedAccount = action.payload;
    },
    clearError: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchAccountsAsync.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAccountsAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.accounts = action.payload;
      })
      .addCase(fetchAccountsAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchAccountDetailsAsync.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAccountDetailsAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedAccount = action.payload;
      })
      .addCase(fetchAccountDetailsAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const {selectAccount, clearError} = accountSlice.actions;
export const selectAccounts = (state: RootState) => state.account.accounts;
export const selectSelectedAccount = (state: RootState) => state.account.selectedAccount;
export const selectIsLoading = (state: RootState) => state.account.isLoading;
export const selectError = (state: RootState) => state.account.error;
export default accountSlice.reducer;
