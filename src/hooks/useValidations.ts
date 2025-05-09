"use client";
import { Service } from "@/interfaces/serviceInterface";
import { ValidationServices } from "@/services/ValidationServices";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export type SortField = "created_at";
export type SortOrder = "asc" | "desc";

export const useServicesRequests = (
  initialStatus?: number,
  serviceStatut?: number
) => {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");

  const [selectedStatus, setSelectedStatus] = useState<number | undefined>(
    initialStatus
  );

  const [serviceStatus, setServiceStatus] = useState<number | undefined>(
    serviceStatut
  );

  const [totalPages, setTotalPages] = useState(1);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [previousPage, setPreviousPage] = useState<string | null>(null);

  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [
      "fetchRequestServices",
      page,
      searchQuery,
      selectedStatus,
      serviceStatus,
      sortField,
      sortOrder,
    ],
    queryFn: async () => {
      const response = await ValidationServices.fetchRequestServices({
        page,
        page_size: pageSize,
        query: searchQuery,
        blocked: selectedStatus,
        status: serviceStatus,
        sort_field: sortField || undefined,
        sort_order: sortOrder,
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

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
    setPage(1);
  };

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
    setServiceStatus,
    sortField,
    sortOrder,
    handleSort,
  };
};

export const useServiceDetails = (service_id?: string) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["fetchServiceDetails", service_id],
    queryFn: async () => {
      const response = await ValidationServices.fetchServiceDetails(
        service_id!
      );
      return response;
    },
    enabled: !!service_id && service_id !== "0",
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

  const { mutateAsync: activateService, isPending: isActivating } = useMutation(
    {
      mutationFn: ValidationServices.activateService,
      onSuccess: (_, service_id) => {
        queryClient.invalidateQueries({
          queryKey: ["activateServiceDetails", service_id],
        });
        toast.success("Service activé avec succès");
      },
      onError: () => {
        toast.error("Une erreur est survenue lors de l'activation du service");
      },
    }
  );

  return {
    activateService,
    isActivating,
  };
};

export const useDesactivateService = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: desactivateService, isPending: isDesactivating } =
    useMutation({
      mutationFn: ValidationServices.desactivateService,
      onSuccess: (_, service_id) => {
        queryClient.invalidateQueries({
          queryKey: ["desactiveServiceDetails", service_id],
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
