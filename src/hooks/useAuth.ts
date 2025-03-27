import { User } from "@/interfaces/userInterface";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
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
      toast.success("Connexion réussie");
      queryClient.invalidateQueries({ queryKey: ["user"] });

      const redirectTo = "/dashboard";
      router.push(redirectTo);

      return response.data.user;
    },
    onError: () => {
      toast.error("Une erreur est survenue lors de la connexion");
    },
  });

  const login = (
    credentials: LoginCredentials,
    callbacks?: MutationCallbacks
  ) => {
    return loginMutation.mutate(credentials, {
      onSuccess: (data) => {
        toast.success("Connexion réussie");
        callbacks?.onSuccess?.(data.data.user);
      },
      onError: () => {
        toast.error("Information de connexion incorrect");
      },
    });
  };

  const logout = () => {
    AuthService.logout();
    queryClient.clear();
    router.push("/login");
  };

  const resetPasswordMutation = useMutation({
    mutationFn: (email: string) => AuthService.resetPassword(email),
    onSuccess: () => {
      router.push("/otp-verification");
    },
    onError: (error) => {
      throw error;
    },
  });

  const resetPassword = (
    email: string,
    callbacks?: { onSuccess?: () => void; onError?: (error: unknown) => void }
  ) => {
    return resetPasswordMutation.mutate(email, {
      onSuccess: () => {
        callbacks?.onSuccess?.();
      },
      onError: (error) => {
        if (callbacks?.onError) {
          callbacks.onError(error);
        } else if (process.env.NODE_ENV === "development") {
          console.error("Erreur lors de la réinitialisation :", error);
        }
      },
    });
  };

  const verifyOTPMutation = useMutation({
    mutationFn: (data: { email: string; otp: string }) =>
      AuthService.verifyOTP(data.email, data.otp),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      router.push("/change-password");
    },
    onError: (error) => {
      throw error;
    },
  });

  const verifyOTP = (
    email: string,
    otp: string,
    callbacks?: { onSuccess?: () => void; onError?: (error: unknown) => void }
  ) => {
    return verifyOTPMutation.mutate(
      { email, otp },
      {
        onSuccess: () => {
          callbacks?.onSuccess?.();
        },
        onError: (error) => {
          if (callbacks?.onError) {
            callbacks.onError(error);
          } else if (process.env.NODE_ENV === "development") {
            console.error("Erreur lors de la vérification OTP:", error);
          }
        },
      }
    );
  };

  const changePasswordMutation = useMutation({
    mutationFn: (data: {
      password: string;
      confirm_password: string;
      email: string;
    }) =>
      AuthService.changePassword(
        data.confirm_password,
        data.password,
        data.email
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      router.push("/login");
    },
    onError: (error) => {
      throw error;
    },
  });

  const changePassword = (
    password: string,
    confirm_password: string,
    email: string,
    callbacks?: { onSuccess?: () => void; onError?: (error: unknown) => void }
  ) => {
    return changePasswordMutation.mutate(
      { password, confirm_password, email },
      {
        onSuccess: () => {
          callbacks?.onSuccess?.();
        },
        onError: (error) => {
          if (callbacks?.onError) {
            callbacks.onError(error);
          } else if (process.env.NODE_ENV === "development") {
            console.error("Erreur lors du changement de mot de passe:", error);
          }
        },
      }
    );
  };

  return {
    login,
    logout,
    resetPassword,
    resetIsLoading: resetPasswordMutation.isPending,
    resetError: resetPasswordMutation.error,
    verifyOTP,
    verifyIsLoading: verifyOTPMutation.isPending,
    verifyError: verifyOTPMutation.error,
    changePassword,
    changePasswordIsLoading: changePasswordMutation.isPending,
    changePasswordError: changePasswordMutation.error,
    isAuthenticated: AuthService.isAuthenticated,
    currentUser: AuthService.getUser,
    isLoading: loginMutation.isPending,
    error: loginMutation.error,
  };
};
