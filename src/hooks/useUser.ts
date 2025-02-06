import { useQuery } from "@tanstack/react-query";
import { fetchUserById } from "@/services/UserService";

export const useUser = (id: string) => {
  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user", id],
    queryFn: () => fetchUserById(id),
    enabled: !!id,
  });

  return {
    user,
    loading: isLoading,
    error: error?.message,
  };
};
