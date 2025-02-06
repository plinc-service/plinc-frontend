export interface Transaction {
  id: string;
  user: {
    id: string;
    username: string;
  };
  type: string;
  amount: number;
  payment_intent_id?: string;
  payout_id?: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface TransactionResponse {
  success: boolean;
  data: Transaction[];
  previous: string | null;
  next: string | null;
  total_pages: number;
}
