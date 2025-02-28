import { User } from "./userInterface";

export interface AuthResponse {
  success: boolean;
  data: {
    token: string;
    user: User;
  };
  previous: string | null;
  next: string | null;
  total_pages: number;
}

export interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
}
