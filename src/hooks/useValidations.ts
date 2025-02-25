"use client";
import { ValidationServices } from "@/services/ValidationServices";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export const useServicesRequests = () => {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<number | undefined>(
    undefined
  );

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["fetchRequestServices", page, searchQuery, selectedStatus],
    queryFn: () =>
      ValidationServices.fetchRequestServices({
        page,
        page_size: pageSize,
        sort_field: "created_at",
        sort_order: "desc",
        query: searchQuery,
        is_active: selectedStatus?.toString(),
      }),
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
  };
};
