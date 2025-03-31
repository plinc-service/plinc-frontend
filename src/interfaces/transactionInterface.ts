import { Plinc } from "./plincInterface";
import { User } from "./userInterface";

export interface Transaction {
  id: number;
  user: User;
  plinc: Plinc;
  type: string;
  amount: number;
  description?: string;
  payment_intent_id: string;
  payout_id: string;
  status: number;
  created_at: string;
  updated_at: string;
  siret_num: number | null;
  iban_num: number | null;
}

export interface TransactionResponse {
  success: boolean;
  data: Transaction[];
  previous: string | null;
  next: string | null;
  total_pages: number;
}

export interface TransactionDetailsPopupProps {
  open: boolean;
  onClose: () => void;
  refetchList: () => void;
  transactionDetails?: Transaction | null;
}

export interface RejectWithdrawalReasonPopupProps {
  open: boolean;
  onClose: () => void;
  refetchList: () => void;
  closeAllPopups: () => void;
  transactionDetails?: Transaction | null;
}
