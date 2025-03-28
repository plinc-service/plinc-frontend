import { Transaction } from "@/interfaces/transactionInterface";
import Axios from "@/utils/config-axios";
import axios from "axios";

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
    user_id,
    status,
    type,
  }: {
    page?: number;
    page_size?: number;
    query?: string;
    sort_field?: string;
    sort_order?: string;
    user_id?: string;
    status?: string;
    type?: string;
  }): Promise<Transaction[]> => {
    try {

      const response = await Axios.get("/transactions", {
        params: {
          page,
          page_size,
          query,
          sort_field,
          sort_order,
          user_id,
          status,
          type,
        },
      });
      return response.data.data;
    } catch (error) {
      console.error("Erreur lors de la récupération des transactions :", error);
      throw error;
    }
  },

  validateOrRejectWithdrawal: async (
    id: string,
    status: number
  ): Promise<void> => {
    try {
      const baseUrl = "https://api-plinc.gini-africa.com";
      await axios.put(`${baseUrl}/wallet/activation/${id}`, {
        status,
      });
    } catch (error) {
      console.error(
        "Erreur lors de la validation ou du rejet du retrait :",
        error
      );
      throw error;
    }
  },
  validateService: async (id: string) => {
    try {
      await Axios.put(`/service/activation/${id}`, {
        status: 1,
      });
    } catch (error) {
      console.error(
        "Erreur lors de la validation ou du rejet du service :",
        error
      );
      throw error;
    }
  },
  rejectService: async (id: string) => {
    try {
      await Axios.put(`/service/activation/${id}`, {
        status: 2,
      });
    } catch (error) {
      console.error("Erreur lors de la rejet du service :", error);
      throw error;
    }
  },
};
