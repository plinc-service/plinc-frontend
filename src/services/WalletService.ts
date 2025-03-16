import { SortOrder, WalletSortField } from "@/hooks/useWallets";
import {
  WalletDetails,
  WalletDetailsResponse,
  WalletResponse,
} from "@/interfaces/walletInterface";
import Axios from "@/utils/config-axios";

export const WalletService = {
  fetchWallets: async (
    page = 1,
    search = "",
    sortField: WalletSortField = "created_at",
    sortOrder: SortOrder = "desc"
  ): Promise<WalletResponse> => {
    try {
      const response = await Axios.get("/wallet", {
        params: {
          page,
          search,
          sort_field: sortField,
          sort_order: sortOrder,
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
