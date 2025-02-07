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
