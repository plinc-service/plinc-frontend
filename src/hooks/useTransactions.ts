import { TransactionsServices } from "@/services/TransactionService";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

export type Statut = 0 | 1;

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
    queryKey: ["transactions", page, searchQuery],
    queryFn: () =>
      TransactionsServices.fetchTransactions({
        page,
        page_size: pageSize,
        query: searchQuery,
      }),
  });

  return {
    transactions: data || [],
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

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["fetchWithdrawalRequests", searchQuery],
    queryFn: () =>
      TransactionsServices.fetchTransactions({
        query: searchQuery || "retrait",
        status: "0",
        page: page,
        page_size: pageSize,
      }),
    enabled: true,
    refetchOnWindowFocus: false,
  });

  return {
    data: data || [],
    loading: isLoading,
    error: error
      ? "Une erreur est survenue lors du chargement des retraits."
      : null,
    refetch,
    page,
    setPage,
    searchQuery,
    setSearchQuery,
  };
};

export const useValidateOrRejectWithdrawal = (
  onSuccessCallback?: () => void
) => {
  const mutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: number }) =>
      TransactionsServices.validateOrRejectWithdrawal(id, status),
    onSuccess: () => {
      if (onSuccessCallback) {
        onSuccessCallback();
      }
      toast.success("Retrait validé avec succès");
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
    mutationFn: ({ id }: { id: string }) =>
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

export const useRejectService = (onSuccessCallback?: () => void) => {
  const mutation = useMutation({
    mutationFn: ({ id }: { id: string }) =>
      TransactionsServices.rejectService(id),
    onSuccess: () => {
      if (onSuccessCallback) {
        onSuccessCallback();
      }
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
