import {Transaction, TransferRequest, TransferResponse} from '../types/transaction';
import {getApiClient} from './apiClient';

export const getTransactions = async (
  accountId: string,
  limit: number = 50,
): Promise<Transaction[]> => {
  try {
    const response = await getApiClient().get(`/accounts/${accountId}/transactions`, {
      params: {limit},
    });
    return response.data.transactions;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch transactions');
  }
};

export const getTransactionDetails = async (
  transactionId: string,
): Promise<Transaction> => {
  try {
    const response = await getApiClient().get(`/transactions/${transactionId}`);
    return response.data.transaction;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch transaction');
  }
};

export const transferMoney = async (
  transferData: TransferRequest,
): Promise<TransferResponse> => {
  try {
    const response = await getApiClient().post('/transactions/transfer', transferData);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Transfer failed');
  }
};

export const getBeneficiaries = async (): Promise<any[]> => {
  try {
    const response = await getApiClient().get('/beneficiaries');
    return response.data.beneficiaries;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch beneficiaries');
  }
};

export const addBeneficiary = async (beneficiaryData: any): Promise<any> => {
  try {
    const response = await getApiClient().post('/beneficiaries', beneficiaryData);
    return response.data.beneficiary;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to add beneficiary');
  }
};
