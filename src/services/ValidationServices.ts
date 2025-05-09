import {
  ServiceDetailsResponse,
  ServicesResponse,
} from "@/interfaces/serviceInterface";
import Axios from "@/utils/config-axios";

export const ValidationServices = {
  fetchRequestServices: async ({
    page = 1,
    page_size = 10,
    sort_field,
    sort_order = "desc",
    query,
    status,
    blocked,
    user_id,
  }: {
    page?: number;
    page_size?: number;
    query?: string;
    sort_field?: string;
    sort_order?: string;
    blocked?: number;
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
          ...(blocked !== undefined && { blocked }),
          ...(status !== undefined && { status }),
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
        blocked: true,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  desactivateService: async (service_id: string) => {
    try {
      const response = await Axios.put(`/service/activation/${service_id}`, {
        blocked: false,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
