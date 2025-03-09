import { Service } from "@/interfaces/serviceInterface";
import Axios from "@/utils/config-axios";

export const ValidationServices = {
  fetchRequestServices: async ({
    page = 1,
    page_size = 10,
    sort_field = "created_at",
    sort_order = "desc",
    query = "",
    is_active,
    user_id,
  }: {
    page?: number;
    page_size?: number;
    query?: string;
    sort_field?: string;
    sort_order?: string;
    is_active?: string;
    user_id?: string;
  }): Promise<Service[]> => {
    try {
      const response = await Axios.get("/services", {
        params: {
          page,
          page_size,
          query,
          sort_field,
          sort_order,
          is_active,
          user_id,
        },
      });
      
      return response.data.data;
    } catch (error) {
      console.error("Erreur lors de la récupération des services:", error);
      throw error;
    }
  },
};
