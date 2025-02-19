import { Transaction } from "@/interfaces/transactionInterface";
import Axios from "@/utils/config-axios";

export interface TransationsWallet {
  data: {
    total_amount: number;
    amount_in_progress: number;
  };
}

export const TransactionsServices = {
  fetchGlobalWallet: async (page = 1): Promise<TransationsWallet> => {
    try {
      const response = await Axios.get("/global/wallet", {
        params: { page },
      });
      return response.data as TransationsWallet;
    } catch (error) {
      console.error("Erreur lors de la récupération des transactions :", error);
      throw error;
    }
  },
  fetchTransactions: async ({
    page = 1,
    page_size = 10,
    query = "",
    sort_field = "created_at",
    sort_order = "desc",
    status,
    user_id,
  }: {
    page?: number;
    page_size?: number;
    query?: string;
    sort_field?: string;
    sort_order?: string;
    status?: string;
    user_id?: string;
  }): Promise<Transaction[]> => {
    try {
      const response = await Axios.get(
        "https://api-plinc.gini-africa.com/administrator/transactions",
        {
          params: {
            page,
            page_size,
            query,
            sort_field,
            sort_order,
            status,
            user_id,
          },
        }
      );
      return response.data.data;
    } catch (error) {
      console.error("Erreur lors de la récupération des transactions :", error);
      throw error;
    }
  },
};
