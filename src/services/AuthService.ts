import { AuthResponse } from "@/interfaces/authService";
import { User } from "@/interfaces/userInterface";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "sonner";

const TOKEN_KEY = "auth-token";
const USER_KEY = "auth-user";
const BaseUrl = `${process.env.NEXT_PUBLIC_API_URL}`

export const AuthService = {
  getToken: () => {
    const cookieToken = Cookies.get(TOKEN_KEY);
    const localToken = localStorage.getItem(TOKEN_KEY);

    return cookieToken || localToken || null;
  },

  getUser: (): User | null => {
    try {
      const userString = localStorage.getItem(USER_KEY);
      if (userString) {
        return JSON.parse(userString);
      }
      return null;
    } catch {
      toast.error("Une erreur est survenue");
      return null;
    }
  },

  setToken: (token: string) => {
    localStorage.setItem(TOKEN_KEY, token);
    Cookies.set(TOKEN_KEY, token, {
      expires: 7,
      path: "/",
      sameSite: "strict",
    });
  },

  setUser: (user: User) => {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  removeToken: () => {
    localStorage.removeItem(TOKEN_KEY);
    Cookies.remove(TOKEN_KEY, { path: "/" });
  },

  removeUser: () => {
    localStorage.removeItem(USER_KEY);
  },

  login: async (email: string, password: string): Promise<AuthResponse> => {
    const url = `${BaseUrl}/auth/login`;
    try {
      const response = await axios.post<AuthResponse>(url, {
        email,
        password,
      });

      const { data } = response;

      if (data.success && data.data.token) {
        AuthService.setToken(data.data.token);
        AuthService.setUser(data.data.user);
        return data;
      } else {
        throw new Error(
          "La réponse du serveur ne contient pas de token valide"
        );
      }
    } catch (error) {
      throw error;
    }
  },

  logout: () => {
    AuthService.removeToken();
    AuthService.removeUser();
  },

  isAuthenticated: () => {
    return !!AuthService.getToken();
  },

  resetPassword: async (email: string): Promise<void> => {
    const url = `${BaseUrl}/auth/reset-password/confirm`;
    try {
      await axios.post(url, { email });
    } catch (error) {
      throw error;
    }
  },

  verifyOTP: async (email: string, otp: string): Promise<void> => {
    const url = `${BaseUrl}/auth/confirm-reset`;
    try {
      await axios.post(url, { email, otp });
    } catch (error) {
      throw error;
    }
  },

  changePassword: async (
    password: string,
    confirm_password: string,
    email: string
  ): Promise<void> => {
    const url = `${BaseUrl}/auth/reset-password`;
    try {
      await axios.post(url, { password, confirm_password, email });
    } catch (error) {
      throw error;
    }
  },
};
