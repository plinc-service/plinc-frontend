"use client";
import { CategoryFormType } from "@/interfaces/categoryInterface";
import { CategoryService } from "@/services/CategoryService";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";

export const useCategoryRequests = () => {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<number | undefined>(
    undefined
  );

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["fetchCategories", page, searchQuery, selectedStatus],
    queryFn: () =>
      CategoryService.getCategories({
        page,
        page_size: pageSize,
        query: searchQuery,
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

export const useCreateCategory = () => {
  const { mutate, isPending, error } = useMutation({
    mutationFn: (data: CategoryFormType) =>
      CategoryService.createCategory(data),
  });
  return {
    mutate,
    isPending,
    error: error
      ? "Une erreur est survenue lors de la création de la catégorie."
      : null,
  };
};

export const useDeleteCategory = () => {
  const { mutate, isPending, error } = useMutation({
    mutationFn: (id: string) => CategoryService.deleteCategory(id),
  });
  return {
    mutate,
    isPending,
    error: error
      ? "Une erreur est survenue lors de la suppression de la catégorie."
      : null,
  };
};

export const useUpdateCategory = () => {
  const { mutate, isPending, error } = useMutation({
    mutationFn: ({ id, data }: { id: string; data: CategoryFormType }) =>
      CategoryService.updateCategory(id, data),
  });

  return {
    mutate,
    isPending,
    error: error
      ? "Une erreur est survenue lors de la mise à jour de la catégorie."
      : null,
  };
};
