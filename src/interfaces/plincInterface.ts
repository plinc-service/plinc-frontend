import { Service } from "./serviceInterface";

export interface Plinc {
  id: number;
  service: Service;
  customer: string;
  address: string;
  longitude: number;
  latitude: number;
  date: string;
  time: string;
  end_estimate: string;
  status: number;
  accepted: boolean;
  confirmed: boolean;
  rejected: boolean;
  cancelled: boolean;
  user_cancelled: boolean;
  pro_cancelled: boolean;
  in_cancel_review: boolean;
  reason_cancel: string;
  accepted_at: string;
  rejected_at: string;
  confirmed_at: string;
  cancelled_at: string;
  shipped_at: string;
  terminated_at: string;
  litiged_at: string;
  started_at: string;
  created_at: string;
  updated_at: string;
}
