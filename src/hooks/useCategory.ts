"use client";
import { Category, CategoryFormType } from "@/interfaces/categoryInterface";
import { CategoryService } from "@/services/CategoryService";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export const useCategoryRequests = () => {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(8);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<number | undefined>(
    undefined
  );
  const [totalPages, setTotalPages] = useState(1);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [previousPage, setPreviousPage] = useState<string | null>(null);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["fetchCategories", page, searchQuery, selectedStatus],
    queryFn: async () => {
      const response = await CategoryService.getCategories({
        page,
        page_size: pageSize,
        query: searchQuery,
      });
      return response;
    },
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

  const categories: Category[] = data?.data || [];

  return {
    data: categories,
    loading: isLoading,
    error: error
      ? "Une erreur est survenue lors du chargement des services."
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
