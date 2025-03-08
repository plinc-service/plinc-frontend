import { useQuery } from "@tanstack/react-query";
import { WalletService } from "../services/WalletService";
import { useState } from "react";

export interface Pagination {
  previous?: string | null;
  next?: string | null;
}

export type WalletSortField = "created_at" | "amount";
export type SortOrder = "asc" | "desc";

export const useWallets = (initialPage = 1) => {
  const [page, setPage] = useState(initialPage);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<WalletSortField>("created_at");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["wallets", page, searchQuery, sortField, sortOrder],
    queryFn: () => WalletService.fetchWallets(page, searchQuery, sortField, sortOrder),
  });

  return {
    wallets: data?.data ?? [],
    pagination: {
      previous: data?.previous,
      next: data?.next,
    },
    loading: isLoading,
    error: error
      ? "Une erreur est survenue lors du chargement des données."
      : null,
    page,
    setPage,
    searchQuery,
    setSearchQuery,
    sortField,
    setSortField,
    sortOrder,
    setSortOrder,
    refetch,
  };
};
