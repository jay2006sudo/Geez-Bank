export interface Transaction {
  id: string;
  accountId: string;
  type: 'debit' | 'credit';
  amount: number;
  currency: string;
  description: string;
  status: 'completed' | 'pending' | 'failed';
  timestamp: string;
  recipientName?: string;
  recipientAccount?: string;
}

export interface TransferRequest {
  fromAccountId: string;
  toAccountId: string;
  amount: number;
  description?: string;
  recipientName?: string;
}

export interface TransferResponse {
  transactionId: string;
  status: 'success' | 'failed';
  message: string;
}
