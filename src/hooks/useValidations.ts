"use client";
import { Service } from "@/interfaces/serviceInterface";
import { ValidationServices } from "@/services/ValidationServices";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export type SortField = "created_at" | "number_of_sells";
export type SortOrder = "asc" | "desc";

export const useServicesRequests = () => {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<number | undefined>(
    undefined
  );
  const [totalPages, setTotalPages] = useState(1);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [previousPage, setPreviousPage] = useState<string | null>(null);
  const [status, setStatus] = useState<string | undefined>(undefined);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["fetchRequestServices", page, searchQuery, selectedStatus],
    queryFn: async () => {
      const response = await ValidationServices.fetchRequestServices({
        page,
        page_size: pageSize,
        query: searchQuery,
        // is_active: selectedStatus?.toString(),
        status: status,
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

  const services: Service[] = data?.data || [];

  return {
    data: services,
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
    status,
    setStatus,
  };
};

export const useServiceDetails = (service_id: string) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["fetchServiceDetails", service_id],
    queryFn: async () => {
      const response = await ValidationServices.fetchServiceDetails(service_id);
      return response;
    },
    enabled: !!service_id,
  });

  const serviceDetails = data?.data || null;

  return {
    data: serviceDetails,
    isLoading,
    error,
    refetch,
  };
};

export const useActivateService = () => {
  const queryClient = useQueryClient();

  const { mutate: activateService, isPending: isActivating } = useMutation({
    mutationFn: ValidationServices.activateService,
    onSuccess: (_, service_id) => {
      queryClient.invalidateQueries({
        queryKey: ["fetchServiceDetails", service_id],
      });
      toast.success("Service activé avec succès");
    },
    onError: () => {
      toast.error("Une erreur est survenue lors de l'activation du service");
    },
  });

  return {
    activateService,
    isActivating,
  };
};

export const useDesactivateService = () => {
  const queryClient = useQueryClient();

  const { mutate: desactivateService, isPending: isDesactivating } =
    useMutation({
      mutationFn: ValidationServices.desactivateService,
      onSuccess: (_, service_id) => {
        queryClient.invalidateQueries({
          queryKey: ["fetchServiceDetails", service_id],
        });
        toast.success("Service désactivé avec succès");
      },
      onError: () => {
        toast.error(
          "Une erreur est survenue lors de la désactivation du service"
        );
      },
    });

  return {
    desactivateService,
    isDesactivating,
  };
};
