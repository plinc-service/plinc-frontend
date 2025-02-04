import { WalletResponse } from "@/interfaces/walletInterface";
import Axios from "@/utils/config-axios";

export const fetchWallets = async (): Promise<WalletResponse> => {
  try {
    const response = await Axios.get("/wallets");
    return response.data as WalletResponse;
  } catch (error) {
    console.error("Erreur lors de la récupération des portefeuilles :", error);
    throw error;
  }
};
