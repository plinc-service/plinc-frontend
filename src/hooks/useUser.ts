import { UserService } from "@/services/UpdateProfile";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: UserService.updateUser,
    onSuccess: () => {
      toast.success("Profil mis à jour avec succès");
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
    },
    onError: () => {
      toast.error("Erreur lors de la mise à jour du profil");
    },
  });

  return {
    updateUser: mutateAsync,
    isPending,
  };
};
