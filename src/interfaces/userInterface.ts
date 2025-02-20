import { Service } from "@/types/services";
import { Calendar, Realisation } from "./serviceInterface";

export interface User {
  id: string;
  number_plinc_seller: number;
  number_plinc_buyer: number;
  services: Service[];
  realisations: Realisation[];
  calendar: Calendar;
  revenue_waiting: number;
  revenue_total: number;
  total_note: number;
  wallet: string;
  last_login: string;
  is_superuser: boolean;
  first_name: string;
  last_name: string;
  is_staff: boolean;
  is_active: boolean;
  date_joined: string;
  username: string;
  email: string;
  phone: string;
  profession: string;
  siret_num: string;
  iban_num: string;
  image_url: string;
  code_verification: string;
  is_verified: boolean;
  reset_session: boolean;
  address_prestataire: string;
  address_client: string;
  longitude_prestataire: number;
  latitude_prestataire: number;
  longitude_client: number;
  latitude_client: number;
  groups: string;
  user_permissions: string;
}

export interface UserResponse {
  data: User[];
  previous: string | null;
  next: string | null;
}
