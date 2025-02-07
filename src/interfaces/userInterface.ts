<<<<<<< HEAD
import { Service } from "./serviceInterface";
=======
export interface Service {
  id: number;
  title: string;
  description: string;
  enabled: boolean;
}
>>>>>>> 1bea3d25a5cbade29a96b40ac000d88fb8c3ff1a

export interface User {
  id: string;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  profession?: string;
  image_url?: string;
  address_client?: string;
  address_prestataire?: string;
  date_joined: string;
  is_active: boolean;
  services: Service[];
<<<<<<< HEAD
=======
  siret_num?: string;
  iban_num?: string;
  number_plinc_buyer: number;
  number_plinc_seller: number;
  revenue_waiting: number;
  revenue_total: number;
>>>>>>> 1bea3d25a5cbade29a96b40ac000d88fb8c3ff1a
}

export interface UserResponse {
  data: User[];
  previous: string | null;
  next: string | null;
}
