import { Transaction } from "./transactionInterface";

export interface Wallet {
  id: string;
  user: {
    id: string;
    username: string;
    email: string;
    revenue_total: number;
    revenue_waiting?: number | null;
  };
  image_url?: string | null;
  className?: string;
  amount: string;
}

export interface WalletResponse {
  success: boolean;
  data: Wallet[];
  previous?: string | null;
  next?: string | null;
}

export interface WalletDetails {
  id: string;
  user: {
    username: string;
    email: string;
    image_url?: string | null;
    revenue_waiting?: number | null;
    revenue_total: number;
  };
  amount: number;
  transactions: Transaction[];
  createdAt?: string;
}

export interface WalletDetailsResponse {
  success: boolean;
  data: WalletDetails;
}

export interface WalletDetailsPopupProps {
  open: boolean;
  onClose: () => void;
  walletDetails?: WalletDetails | null;
}

export interface WalletListProps {
  wallets: Wallet[];
}
