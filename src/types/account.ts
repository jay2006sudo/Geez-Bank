export interface Account {
  id: string;
  accountNumber: string;
  accountName: string;
  balance: number;
  currency: string;
  accountType: 'savings' | 'checking' | 'credit';
  status: 'active' | 'inactive' | 'frozen';
  createdAt: string;
  lastModified: string;
}

export interface AccountDetails extends Account {
  interestRate?: number;
  creditLimit?: number;
  overdraftProtection?: boolean;
}
