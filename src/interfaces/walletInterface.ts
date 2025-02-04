import { Wallet } from "./userCardInterface";

export interface WalletResponse {
  success: boolean;
  data: Wallet[];
  previous?: string | null;
  next?: string | null;
}
