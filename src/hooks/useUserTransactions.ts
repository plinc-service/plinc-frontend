import { fetchUserTransactionsHistory } from "@/services/UserService";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

interface UseUserTransactionsParams {
  userId: string;
}

export const useUserTransactions = ({ userId }: UseUserTransactionsParams) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [sortField, setSortField] = useState<"created_at" | "amount">("created_at");
  const [totalPages, setTotalPages] = useState(1);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["userTransactions", userId, currentPage, sortField, sortOrder, searchQuery, selectedFilter],
    queryFn: async () => {
      const response = await fetchUserTransactionsHistory(
        userId,
        currentPage,
        10, 
        sortField,
        sortOrder,
        searchQuery,
        selectedFilter
      );
      
      setTotalPages(response.total_pages);
      return response.data;
    },
    enabled: !!userId,
    refetchOnWindowFocus: false,
  });

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); 
  };

  const handleFilterChange = (filter: string | null) => {
    setSelectedFilter(filter);
    setCurrentPage(1); 
  };

  const handleSortChange = (field: "created_at" | "amount") => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("desc");
    }
    setCurrentPage(1); 
  };

  return {
    transactions: data || [],
    isLoading,
    error: error ? "Erreur lors de la récupération des transactions." : null,
    currentPage,
    setCurrentPage,
    totalPages,
    searchQuery,
    setSearchQuery: handleSearchChange,
    selectedFilter,
    setSelectedFilter: handleFilterChange,
    sortOrder,
    setSortOrder,
    sortField,
    setSortField: (field: "created_at" | "amount") => handleSortChange(field),
    refetch
  };
};
