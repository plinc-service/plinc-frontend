import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { fetchUsers } from "@/services/UserService";

export type SortField = "username" | "email" | "date_joined";
export type SortOrder = "asc" | "desc";

export const useUsersRequests = (initialPageSize = 10) => {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(initialPageSize);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<SortField>("date_joined");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [totalPages, setTotalPages] = useState(1);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [previousPage, setPreviousPage] = useState<string | null>(null);

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["users", page, pageSize, searchQuery, sortField, sortOrder],
    queryFn: async () => {
      return fetchUsers({
        page,
        pageSize,
        sortField,
        sortOrder,
        searchQuery
      });
    }
  });

  useEffect(() => {
    if (data) {
      setTotalPages(data.total_pages || 1);
      setNextPage(data.next);
      setPreviousPage(data.previous);
    }
  }, [data]);

  const goToNextPage = () => {
    if (nextPage && page < totalPages) {
      setPage(page + 1);
    }
  };

  const goToPreviousPage = () => {
    if (previousPage && page > 1) {
      setPage(page - 1);
    }
  };

  const goToPage = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setPage(pageNumber);
    }
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
    setPage(1);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setPage(1);
  };

  return {
    data: data?.data || [],
    loading: isLoading,
    error: error ? String(error) : undefined,
    refetch,
    searchQuery,
    setSearchQuery: handleSearchChange,
    sortField,
    sortOrder,
    handleSort,
    page,
    totalPages,
    nextPage, 
    previousPage,
    goToNextPage,
    goToPreviousPage,
    goToPage,
  };
};
