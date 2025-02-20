import { Service } from "./serviceInterface";

import { User } from './userInterface';

export interface Plinc {
  id: number;
  service: Service;
  customer: User;
  address: string | null;
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
  reason_cancel: string | null;
  accepted_at: string | null;
  rejected_at: string | null;
  confirmed_at: string | null;
  cancelled_at: string | null;
  shipped_at: string | null;
  terminated_at: string | null;
  litiged_at: string | null;
  started_at: string | null;
  created_at: string;
  updated_at: string | null;
}