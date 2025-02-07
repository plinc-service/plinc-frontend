<<<<<<< HEAD
import { Plinc } from "./plincInterface";
import { User } from "./userInterface";

export interface Transaction {
  id: number;
  user: User;
  plinc: Plinc;
  type: string;
  amount: number;
  payment_intent_id: string;
  payout_id: string;
  status: number;
  created_at: string;
  updated_at: string;
}
=======
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
>>>>>>> 1bea3d25a5cbade29a96b40ac000d88fb8c3ff1a
