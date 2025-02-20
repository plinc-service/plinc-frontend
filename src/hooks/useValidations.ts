import { ValidationServices } from "@/services/ValidationServices";
import { useQuery } from "@tanstack/react-query";

export const useServicesRequests = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["fetchRequestServices"],
    queryFn: () =>
      ValidationServices.fetchRequestServices({
        page: 1,
        sort_field: "created_at",
        sort_order: "desc",
      }),
  });

  return {
    data: data || [],
    loading: isLoading,
    error: error
      ? "Une erreur est survenue lors du chargement des retraits."
      : null,
    refetch,
  };
};
