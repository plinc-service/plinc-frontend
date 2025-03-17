import { Transaction } from "@/interfaces/transactionInterface";
import { fetchUserTransactionsHistory } from "@/services/UserService";
import { useEffect, useState } from "react";

interface UseUserTransactionsParams {
  userId: string;
}

export const useUserTransactions = ({ userId }: UseUserTransactionsParams) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [sortField, setSortField] = useState<"created_at" | "amount">("created_at");

  const fetchTransactions = async () => {
    setIsLoading(true);
    try {
      if (!userId) return;
      const data = await fetchUserTransactionsHistory(userId);
      setTransactions(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Erreur lors de la récupération des transactions :", error);
      setError("Erreur lors de la récupération des transactions.");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (transactions.length === 0) return;

    let result = [...transactions];

    if (selectedFilter) {
      if (selectedFilter === "paiement") {
        // Si on filtre par paiement, afficher tout ce qui n'est pas un retrait
        result = result.filter(transaction => 
          transaction.type.toLowerCase() !== "retrait"
        );
      } else {
        // Sinon, filtrer normalement
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

    // Tri
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

    setFilteredTransactions(result);
  }, [transactions, searchQuery, selectedFilter, sortOrder, sortField]);

  useEffect(() => {
    if (userId) {
      fetchTransactions();
    }
  }, [userId]);

  return {
    transactions: filteredTransactions,
    isLoading,
    error,
    searchQuery,
    setSearchQuery,
    selectedFilter,
    setSelectedFilter,
    sortOrder,
    setSortOrder,
    sortField,
    setSortField,
    refetch: fetchTransactions
  };
};
