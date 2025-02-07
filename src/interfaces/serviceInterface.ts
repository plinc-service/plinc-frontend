export interface Service {
  id: number;
  owner: string;
  number_of_sells: number;
  number_of_waiting: number;
  name: string;
  category: string;
  hour_service: number;
  hour_price: number;
  description: string;
  home_service: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}
