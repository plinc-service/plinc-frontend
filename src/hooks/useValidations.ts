"use client";
import { ValidationServices } from "@/services/ValidationServices";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export type SortField = "created_at" | "number_of_sells";
export type SortOrder = "asc" | "desc";

export const useServicesRequests = () => {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<number | undefined>(undefined);
  const [sortField, setSortField] = useState<SortField>("created_at");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["fetchRequestServices", page, searchQuery, selectedStatus, sortField, sortOrder],
    queryFn: () =>
      ValidationServices.fetchRequestServices({
        page,
        page_size: pageSize,
        sort_field: sortField,
        sort_order: sortOrder,
        query: searchQuery,
        is_active: selectedStatus?.toString(),
      }),
    enabled: true,
    refetchOnWindowFocus: false,
  });

  return {
    data: data || [],
    loading: isLoading,
    error: error
      ? "Une erreur est survenue lors du chargement des services."
      : null,
    refetch,
    page,
    setPage,
    searchQuery,
    setSearchQuery,
    selectedStatus,
    setSelectedStatus,
    sortField,
    setSortField,
    sortOrder,
    setSortOrder,
  };
};
