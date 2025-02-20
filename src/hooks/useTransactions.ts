import { TransactionsServices } from "@/services/TransactionService";
import { useMutation, useQuery } from "@tanstack/react-query";

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

export const useWithdrawalRequests = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["fetchWithdrawalRequests"],
    queryFn: () =>
      TransactionsServices.fetchTransactions({
        query: "retrait",
        sort_field: "created_at",
        sort_order: "desc",
        status: "0",
      }),
  });

  return {
    data: data || [],
    loading: isLoading,
    error: error
      ? "Une erreur est survenue lors du chargement des retraits."
      : null,
    refetch,
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
