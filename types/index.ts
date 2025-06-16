// This interface defines the shape of your account data.
// It matches the structure of your MockAPI response.
export interface IAccount {
  id: string;
  createdAt: string;
  name: string;
  avatar: string;
  accountNo: string;
  currentBalance: number;
  status: 'active' | 'inactive' | 'closed';
  updatedAt: string;
}