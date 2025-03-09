"use client";
import { ValidationServices } from "@/services/ValidationServices";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export type SortField = "created_at" | "number_of_sells";
export type SortOrder = "asc" | "desc";

export const useServicesRequests = () => {
  // États pour la pagination
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  
  // États pour la recherche et le filtrage
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<number | undefined>(undefined);
  
  // États pour le tri
  const [sortField, setSortField] = useState<SortField>("created_at");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

  // Déclaration de la requête avec tous les paramètres dans la queryKey pour refetch automatique
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["fetchRequestServices", page, searchQuery, selectedStatus, sortField, sortOrder],
    queryFn: () => {
      return ValidationServices.fetchRequestServices({
        page,
        page_size: pageSize,
        sort_field: sortField,
        sort_order: sortOrder,
        query: searchQuery,
        is_active: selectedStatus?.toString(),
      });
    },
    enabled: true,
    refetchOnWindowFocus: false,
  });

  // Fonction wrapper pour setSortField qui inclut un refetch
  const updateSortField = (field: SortField) => {
    setSortField(field);
  };

  // Fonction wrapper pour setSortOrder qui inclut un refetch
  const updateSortOrder = (order: SortOrder) => {
    setSortOrder(order);
  };

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
    
    // États de tri avec les fonctions optimisées
    sortField,
    setSortField: updateSortField,
    sortOrder,
    setSortOrder: updateSortOrder,
  };
};
