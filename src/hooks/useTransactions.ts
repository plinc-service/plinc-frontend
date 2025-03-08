import { TransactionsServices } from "@/services/TransactionService";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";

export type TransactionSortField = "created_at" | "amount" | "type";
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
  const [sortField, setSortField] = useState<TransactionSortField>("created_at");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [transactionType, setTransactionType] = useState<string | undefined>(undefined);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["transactions", page, searchQuery, sortField, sortOrder, transactionType],
    queryFn: () =>
      TransactionsServices.fetchTransactions({
        page,
        page_size: pageSize,
        query: searchQuery,
        sort_field: sortField,
        sort_order: sortOrder,
        status: transactionType === "retrait-en-attente" ? "0" : undefined,
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
    setSearchQuery,
    sortField,
    setSortField,
    sortOrder,
    setSortOrder,
    transactionType,
    setTransactionType,
    refetch,
  };
};

export const useWithdrawalRequests = () => {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<TransactionSortField>("created_at");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["fetchWithdrawalRequests", searchQuery, sortField, sortOrder],
    queryFn: () =>
      TransactionsServices.fetchTransactions({
        query: searchQuery || "retrait",
        sort_field: sortField,
        sort_order: sortOrder,
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
    sortField,
    setSortField,
    sortOrder,
    setSortOrder,
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
