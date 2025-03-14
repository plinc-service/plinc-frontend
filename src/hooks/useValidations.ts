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
  const [selectedStatus, setSelectedStatus] = useState<number | undefined>(
    undefined
  );

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["fetchRequestServices", page, searchQuery, selectedStatus],
    queryFn: () => {
      return ValidationServices.fetchRequestServices({
        page,
        page_size: pageSize,
        // sort_field: sortField,
        // sort_order: sortOrder,
        query: searchQuery,
        is_active: selectedStatus?.toString(),
      });
    },
    enabled: true,
    refetchOnWindowFocus: false,
  });

  // Fonction wrapper pour setSortField qui inclut un refetch
  // const updateSortField = (field: SortField) => {
  //   setSortField(field);
  // };

  // // Fonction wrapper pour setSortOrder qui inclut un refetch
  // const updateSortOrder = (order: SortOrder) => {
  //   setSortOrder(order);
  // };

  return {
    // Données et statut de chargement
    data: data || [],
    loading: isLoading,
    error: error
      ? "Une erreur est survenue lors du chargement des services."
      : null,
    refetch,

    // États de pagination
    page,
    setPage,

    // États de recherche et filtrage
    searchQuery,
    setSearchQuery,
    selectedStatus,
    setSelectedStatus,

    // // États de tri avec les fonctions optimisées
    // sortField,
    // setSortField: updateSortField,
    // sortOrder,
    // setSortOrder: updateSortOrder,
  };
};
