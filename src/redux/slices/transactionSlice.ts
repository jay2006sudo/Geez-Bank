import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {RootState} from '../store';
import * as transactionService from '../../services/transactionService';
import {Transaction, TransferRequest} from '../../types/transaction';

interface TransactionState {
  transactions: Transaction[];
  isLoading: boolean;
  error: string | null;
  successMessage: string | null;
}

const initialState: TransactionState = {
  transactions: [],
  isLoading: false,
  error: null,
  successMessage: null,
};

export const fetchTransactionsAsync = createAsyncThunk(
  'transaction/fetchTransactions',
  async (
    {accountId, limit = 50}: {accountId: string; limit?: number},
    {rejectWithValue},
  ) => {
    try {
      const transactions = await transactionService.getTransactions(accountId, limit);
      return transactions;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch transactions');
    }
  },
);

export const transferMoneyAsync = createAsyncThunk(
  'transaction/transfer',
  async (transferData: TransferRequest, {rejectWithValue}) => {
    try {
      const result = await transactionService.transferMoney(transferData);
      return result;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Transfer failed');
    }
  },
);

const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    clearSuccess: state => {
      state.successMessage = null;
    },
    clearError: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTransactionsAsync.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTransactionsAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.transactions = action.payload;
      })
      .addCase(fetchTransactionsAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(transferMoneyAsync.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(transferMoneyAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.successMessage = 'Transfer completed successfully';
      })
      .addCase(transferMoneyAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const {clearSuccess, clearError} = transactionSlice.actions;
export const selectTransactions = (state: RootState) => state.transaction.transactions;
export const selectIsLoading = (state: RootState) => state.transaction.isLoading;
export const selectError = (state: RootState) => state.transaction.error;
export const selectSuccessMessage = (state: RootState) => state.transaction.successMessage;
export default transactionSlice.reducer;
