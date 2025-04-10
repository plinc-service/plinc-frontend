import { SortOrder, WalletSortField } from "@/hooks/useWallets";
import {
  WalletDetails,
  WalletDetailsResponse,
  WalletResponse,
} from "@/interfaces/walletInterface";
import Axios from "@/utils/config-axios";

export const WalletService = {
  fetchWallets: async ({
    page = 1,
    page_size = 10,
    query = "",
    sort_field = "created_at",
    sort_order = "desc",
  }: {
    page?: number;
    page_size?: number;
    query?: string;
    sort_field?: WalletSortField;
    sort_order?: SortOrder;
  }): Promise<WalletResponse> => {
    try {
      const response = await Axios.get("/wallet", {
        params: {
          page,
          page_size,
          query,
          sort_field,
          sort_order,
        },
      });
      return response.data as WalletResponse;
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des portefeuilles :",
        error
      );
      throw error;
    }
  },
  fetchWalletDetails: async (id: string): Promise<WalletDetails> => {
    try {
      const response = await Axios.get(`/wallet/${id}`);
      const data = response.data as WalletDetailsResponse;

      return {
        id: String(data.data.id),
        user: data.data.user,
        amount: data.data.amount,
        transactions: data.data.transactions,
      };
    } catch (error) {
      throw error;
    }
  },
};
