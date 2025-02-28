import { PlincDetails } from "@/interfaces/plincDetails";
import { Plinc } from "@/interfaces/plincInterface";
import Axios from "@/utils/config-axios";

export interface PlincResponse {
  success: boolean;
  data: Plinc[];
  previous: string | null;
  next: string | null;
  total_pages: number;
}

class PlincService {
  async getUserPlincs(
    userId: string,
    page: number = 1,
    pageSize: number = 10,
    sortField?: string,
    sortOrder: "asc" | "desc" = "desc",
    query?: string,
    status?: string,
    isClient: boolean = false
  ): Promise<PlincResponse> {
    try {
      const response = await Axios.get("/plincs", {
        params: {
          user_id: userId,
          is_client: isClient ? "1" : "0", // Changed to '1' or '0' string
          page,
          page_size: pageSize,
          ...(sortField && { sort_field: sortField }),
          ...(sortOrder && { sort_order: sortOrder }),
          ...(query && { query }),
          ...(status && { status }),
        },
      });

      return response.data as PlincResponse;
    } catch (error) {
      console.error("Error fetching plincs:", error);
      throw error;
    }
  }

  async getAllPlincs(
    page: number = 1,
    pageSize: number = 10,
    sortField?: string,
    sortOrder: "asc" | "desc" = "desc",
    query?: string,
    status?: number,
    userId?: string,
    serviceId?: string,
    isClient?: boolean
  ): Promise<PlincResponse> {
    try {
      const params: Record<string, string | number | boolean | undefined> = {
        page,
        page_size: pageSize,
        ...(sortField && { sort_field: sortField }),
        ...(sortOrder && { sort_order: sortOrder }),
        ...(query && { query }),
        ...(status && { status }),
        ...(userId && { user_id: userId }),
        ...(serviceId && { service_id: serviceId }),
        ...(isClient !== undefined && { is_client: isClient ? 1 : 0 }),
      };

      const response = await Axios.get("/plincs", { params });
      return response.data as PlincResponse;
    } catch (error) {
      console.error("Error fetching all plincs:", error);
      throw error;
    }
  }

  async getPlincById(id: string): Promise<PlincDetails> {
    try {
      const response = await Axios.get(`/plinc/${id}`);
      const plincDetails = response.data.data;
      const data = {
        id: plincDetails.id,
        service: {
          name: plincDetails.service.name,
          description: plincDetails.service.description,
          category: plincDetails.service.category,
          hour_price: plincDetails.service.hour_price,
          created_at: plincDetails.service.created_at,
        },
        date: plincDetails.date,
        address: plincDetails.address || "Adresse non disponible",
        client: {
          name: plincDetails.customer.username,
          email: plincDetails.customer.email,
          image: plincDetails.customer.image_url || "/avatar.svg",
        },
        provider: {
          name: plincDetails.service.owner.username,
          email: plincDetails.service.owner.email,
          image: plincDetails.service.owner.image_url || "/avatar.svg",
        },
      };
      return data as PlincDetails;
    } catch (error) {
      console.error("Erreur lors de la récupération du plinc :", error);
      throw error;
    }
  }
}

export const plincService = new PlincService();
