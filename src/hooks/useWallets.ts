"use client";
import { WalletService } from "@/services/WalletService";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export type WalletSortField = "created_at" | "amount";
export type SortOrder = "asc" | "desc";

export const useWallets = () => {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<WalletSortField>("created_at");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

  const [totalPages, setTotalPages] = useState(1);
  const [nextPage, setNextPage] = useState<number | null>(null);
  const [previousPage, setPreviousPage] = useState<number | null>(null);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["wallets", page, searchQuery, sortField, sortOrder],
    queryFn: () =>
      WalletService.fetchWallets({
        page,
        page_size: pageSize,
        query: searchQuery,
        sort_field: sortField,
        sort_order: sortOrder,
      }),
  });

  useEffect(() => {
    if (data) {
      setTotalPages(data.total_pages);
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

  const handleSort = (field: WalletSortField) => {
    if (sortField === field) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
    setPage(1);
  };

  return {
    data: data?.data || [],
    loading: isLoading,
    error: error
      ? "Une erreur est survenue lors du chargement des wallets."
      : null,
    refetch,
    page,
    setPage,
    totalPages,
    nextPage,
    previousPage,
    goToNextPage,
    goToPreviousPage,
    goToPage,
    searchQuery,
    setSearchQuery,
    sortField,
    setSortField,
    setSortOrder,
    sortOrder,
    handleSort,
  };
};
