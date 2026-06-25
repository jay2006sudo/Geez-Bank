import {Account, AccountDetails} from '../types/account';
import {getApiClient} from './apiClient';

export const getAccounts = async (): Promise<Account[]> => {
  try {
    const response = await getApiClient().get('/accounts');
    return response.data.accounts;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch accounts');
  }
};

export const getAccountDetails = async (accountId: string): Promise<AccountDetails> => {
  try {
    const response = await getApiClient().get(`/accounts/${accountId}`);
    return response.data.account;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch account details');
  }
};

export const updateAccount = async (
  accountId: string,
  updates: Partial<Account>,
): Promise<Account> => {
  try {
    const response = await getApiClient().put(`/accounts/${accountId}`, updates);
    return response.data.account;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to update account');
  }
};

export const getAccountBalance = async (accountId: string): Promise<number> => {
  try {
    const response = await getApiClient().get(`/accounts/${accountId}/balance`);
    return response.data.balance;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch balance');
  }
};
