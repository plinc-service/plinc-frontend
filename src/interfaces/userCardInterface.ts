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
}
