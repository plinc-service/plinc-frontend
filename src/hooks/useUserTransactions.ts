import { Transaction } from "@/interfaces/transactionInterface";
import { fetchUserTransactionsHistory } from "@/services/UserService";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";

interface UseUserTransactionsParams {
  userId: string;
}

export const useUserTransactions = ({ userId }: UseUserTransactionsParams) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [sortField, setSortField] = useState<"created_at" | "amount">("created_at");

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["userTransactions", userId],
    queryFn: () => fetchUserTransactionsHistory(userId),
    enabled: !!userId,
    refetchOnWindowFocus: false,
  });

  const transactions = useMemo(() => {
    if (!data || data.length === 0) return [];
    
    let result = [...data];

    if (selectedFilter) {
      if (selectedFilter === "paiement") {
        result = result.filter(transaction => 
          transaction.type.toLowerCase() !== "retrait"
        );
      } else {
        result = result.filter(transaction => 
          transaction.type.toLowerCase() === selectedFilter.toLowerCase()
        );
      }
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(transaction => 
        transaction.description?.toLowerCase().includes(query) ||
        transaction.type.toLowerCase().includes(query) ||
        transaction.amount.toString().includes(query)
      );
    }

    result.sort((a, b) => {
      if (sortField === "created_at") {
        return sortOrder === "asc" 
          ? new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
          : new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      } else {
        return sortOrder === "asc" 
          ? a.amount - b.amount
          : b.amount - a.amount;
      }
    });

    return result;
  }, [data, searchQuery, selectedFilter, sortOrder, sortField]);

  return {
    transactions,
    isLoading,
    error: error ? "Erreur lors de la récupération des transactions." : null,
    searchQuery,
    setSearchQuery,
    selectedFilter,
    setSelectedFilter,
    sortOrder,
    setSortOrder,
    sortField,
    setSortField,
    refetch
  };
};
