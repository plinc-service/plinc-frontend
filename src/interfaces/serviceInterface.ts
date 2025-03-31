import { User } from "./userInterface";

export interface CalendarHour {
  id: number;
  start_hour: string;
  end_hour: string;
  created_at: string;
  updated_at: string;
  calendar_day: string;
}

// Interface pour les jours de calendrier
export interface CalendarDay {
  id: number;
  calendar_hours: CalendarHour[];
  name: string;
  index: number;
  created_at: string;
  updated_at: string;
  calendar: string;
}

// Interface pour le calendrier
export interface Calendar {
  id: number;
  user: string;
  calendar_days: CalendarDay[];
  created_at: string;
  updated_at: string;
}

// Interface pour les réalisations
export interface Realisation {
  id: number;
  name: string;
  image: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface Service {
  id: number;
  owner: User;
  number_of_sells: number;
  number_of_waiting: number;
  name: string;
  category: string;
  hour_service: number;
  hour_price: number;
  description: string;
  reject_reason: string;
  statut: number;
  home_service: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  title: string;
  enabled: boolean;
  email?: string;
  image_url?: string;
  username?: string;
}

export interface ServicesResponse {
  success: boolean;
  data: Service[];
  previous: string | null;
  next: string | null;
  total_pages: number;
}

export interface ServiceDetailsResponse {
  success: boolean;
  data: Service;
  previous: string | null;
  next: string | null;
  total_pages: number;
}

export interface ServicesRequestDetailsPopupProps {
  open: boolean;
  onClose: () => void;
  refetchList: () => void;
  service_id?: number;
  servicesDetails?: Service;
}

export interface RejectServiceReasonPopupProps {
  open: boolean;
  onClose: () => void;
  refetchList: () => void;
  closeAllPopups: () => void;
  servicesDetails?: Service | null;
}
