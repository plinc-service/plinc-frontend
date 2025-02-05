import { useQuery } from "@tanstack/react-query";
import { fetchWallets } from "../services/WalletService";

export interface Pagination {
  previous?: string | null;
  next?: string | null;
}

export const useWallets = (page = 1) => {
  const {
    data,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ["wallets", page],
    queryFn: () => fetchWallets(page)
  });

  return {
    wallets: data?.data ?? [],
    pagination: {
      previous: data?.previous,
      next: data?.next
    },
    loading: isLoading,
    error: error ? "Une erreur est survenue lors du chargement des données." : null,
    refetch
  };
};