import {
  ServiceDetailsResponse,
  ServicesResponse,
} from "@/interfaces/serviceInterface";
import Axios from "@/utils/config-axios";

export const ValidationServices = {
  fetchRequestServices: async ({
    page = 1,
    page_size = 10,
    sort_field = "created_at",
    sort_order = "desc",
    query = "",
    // is_active = "0",
    status = 0,
    user_id,
  }: {
    page?: number;
    page_size?: number;
    query?: string;
    sort_field?: string;
    sort_order?: string;
    status?: number;
    user_id?: string;
  }): Promise<ServicesResponse> => {
    try {
      const response = await Axios.get("/services", {
        params: {
          page,
          page_size,
          query,
          sort_field,
          sort_order,
          status,
          user_id,
        },
      });

      return response.data as ServicesResponse;
    } catch (error) {
      throw error;
    }
  },
  fetchServiceDetails: async (service_id: string) => {
    try {
      const response = await Axios.get(`/service/${service_id}`);
      return response.data as ServiceDetailsResponse;
    } catch (error) {
      throw error;
    }
  },
  activateService: async (service_id: string) => {
    try {
      const response = await Axios.put(`/service/activation/${service_id}`, {
        status: true,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  desactivateService: async (service_id: string) => {
    try {
      const response = await Axios.put(`/service/activation/${service_id}`, {
        is_active: false,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
