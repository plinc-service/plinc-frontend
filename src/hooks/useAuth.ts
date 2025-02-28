import { User } from "@/interfaces/userInterface";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { AuthService } from "../services/AuthService";

interface LoginCredentials {
  email: string;
  password: string;
}

interface MutationCallbacks {
  onSuccess?: (user: User) => void;
  onError?: (error: unknown) => void;
}

export const useAuth = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const loginMutation = useMutation({
    mutationFn: (credentials: LoginCredentials) =>
      AuthService.login(credentials.email, credentials.password),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["user"] });

      const redirectTo = "/dashboard";
      router.push(redirectTo);

      return response.data.user;
    },
    onError: (error) => {
      throw error;
    },
  });

  const login = (
    credentials: LoginCredentials,
    callbacks?: MutationCallbacks
  ) => {
    return loginMutation.mutate(credentials, {
      onSuccess: (data) => {
        callbacks?.onSuccess?.(data.data.user);
      },
      onError: (error) => {
        if (callbacks?.onError) {
          callbacks.onError(error);
        } else if (process.env.NODE_ENV === "development") {
          console.error("Erreur lors de l'authentification :", error);
        }
      },
    });
  };

  const logout = () => {
    AuthService.logout();
    queryClient.clear();
    router.push("/login");
  };

  return {
    login,
    logout,
    isAuthenticated: AuthService.isAuthenticated,
    currentUser: AuthService.getUser,
    isLoading: loginMutation.isPending,
    error: loginMutation.error,
  };
};
