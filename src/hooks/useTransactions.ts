import { TransactionResponse } from "@/interfaces/transactionInterface";
import { TransactionsServices } from "@/services/TransactionService";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export type SortOrder = "asc" | "desc";

export const useTransactionWallet = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["fetchGlobalWallet"],
    queryFn: () => TransactionsServices.fetchGlobalWallet(),
  });

  return {
    data: data
      ? {
          total_amount: data.data.total_amount,
          amount_in_progress: data.data.amount_in_progress,
        }
      : {
          total_amount: 0,
          amount_in_progress: 0,
        },
    loading: isLoading,
    error: error
      ? "Une erreur est survenue lors du chargement des données."
      : null,
    refetch,
  };
};

export const useTransactionHistory = () => {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["transactions", page, searchQuery, selectedFilter],
    queryFn: () =>
      TransactionsServices.fetchTransactions({
        page,
        page_size: pageSize,
        type: selectedFilter ?? undefined,
      }),
  });

  return {
    transactions: data?.data || [],
    loading: isLoading,
    error: error
      ? "Une erreur est survenue lors du chargement des transactions."
      : null,
    page,
    setPage,
    searchQuery,
    selectedFilter,
    setSelectedFilter,
    setSearchQuery,
    refetch,
  };
};

export const useWithdrawalRequests = () => {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [status, setStatus] = useState(0);
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [totalPages, setTotalPages] = useState(1);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [previousPage, setPreviousPage] = useState<string | null>(null);

  const { data, isLoading, error, refetch } = useQuery<TransactionResponse>({
    queryKey: ["fetchWithdrawalRequests", searchQuery, sortOrder],
    queryFn: () =>
      TransactionsServices.fetchTransactions({
        query: searchQuery || "retrait",
        status: status,
        page: page,
        page_size: pageSize,
        sort_order: sortOrder,
      }),
    enabled: true,
    refetchOnWindowFocus: false,
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

  return {
    data: data?.data || [],
    loading: isLoading,
    error: error
      ? "Une erreur est survenue lors du chargement des retraits."
      : null,
    refetch,
    page,
    totalPages,
    setPage,
    goToPage,
    goToPreviousPage,
    goToNextPage,
    searchQuery,
    setStatus,
    setSearchQuery,
    setSortOrder,
  };
};

export const useValidateOrRejectWithdrawal = () => {
  const mutation = useMutation({
    mutationFn: ({
      id,
      status,
      rejected_reason,
    }: {
      id: number;
      status: number;
      rejected_reason?: string;
    }) =>
      TransactionsServices.validateOrRejectWithdrawal(
        id,
        status,
        rejected_reason
      ),
    onSuccess: () => {
      toast.success("Succès");
    },
    onError: () => {
      toast.error("Une erreur est survenue lors du traitement de la demande.");
    },
  });

  return {
    validateOrRejectWithdrawal: mutation.mutate,
    loading: mutation.isPending,
    error: mutation.error
      ? "Une erreur est survenue lors du traitement de la demande."
      : null,
    success: mutation.isSuccess,
  };
};

export const useValidateService = (onSuccessCallback?: () => void) => {
  const mutation = useMutation({
    mutationFn: ({ id }: { id: number }) =>
      TransactionsServices.validateService(id),
    onSuccess: () => {
      if (onSuccessCallback) {
        onSuccessCallback();
      }
      toast.success("Service validé avec succès");
    },
    onError: () => {
      toast.error("Une erreur est survenue lors du traitement de la demande.");
    },
  });

  return {
    validateService: mutation.mutate,
    validateLoading: mutation.isPending,
    error: mutation.error
      ? "Une erreur est survenue lors du traitement de la demande."
      : null,
    success: mutation.isSuccess,
  };
};

export const useRejectService = () => {
  const mutation = useMutation({
    mutationFn: ({
      id,
      rejected_reason,
    }: {
      id: number;
      rejected_reason: string;
    }) => TransactionsServices.rejectService(id, rejected_reason),

    onSuccess: () => {
      toast.success("Service rejeté avec succès");
    },

    onError: () => {
      toast.error("Une erreur est survenue lors du traitement de la demande.");
    },
  });

  return {
    rejectService: mutation.mutate,
    rejectLoading: mutation.isPending,
    error: mutation.error
      ? "Une erreur est survenue lors du traitement de la demande."
      : null,
    success: mutation.isSuccess,
  };
};
