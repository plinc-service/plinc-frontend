import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "@/services/UserService";

export const useUsers = (page = 1) => {
  const {
    data,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ["users", page],
    queryFn: () => fetchUsers(page)
  });

  return {
    users: data?.data ?? [],
    pagination: {
      previous: data?.previous,
      next: data?.next
    },
    loading: isLoading,
    error: error ? "Une erreur est survenue lors du chargement des utilisateurs." : null,
    refetch
  };
};
