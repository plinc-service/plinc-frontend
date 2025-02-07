import { Service } from "./serviceInterface";

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
}

export interface UserResponse {
  data: User[];
  previous: string | null;
  next: string | null;
}
