import { Plinc } from '@/interfaces/plincInterface';
import Axios from '@/utils/config-axios';

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
    sortOrder: 'asc' | 'desc' = 'desc',
    query?: string,
    status?: string,
    isClient: boolean = true
  ): Promise<PlincResponse> {
    try {
      const response = await Axios.get('plincs', {
        params: {
          user_id: userId,
          is_client: isClient ? 1 : 0,
          page,
          page_size: pageSize,
          ...(sortField && { sort_field: sortField }),
          ...(sortOrder && { sort_order: sortOrder }),
          ...(query && { query }),
          ...(status && { status }),
          ...(isClient !== undefined && { is_client: isClient })
        },
      });

      return response.data as PlincResponse;
    } catch (error) {
      console.error('Error fetching plincs:', error);
      throw error;
    }
  }

  async getAllPlincs(
    page: number = 1,
    pageSize: number = 10,
    sortField?: string,
    sortOrder: 'asc' | 'desc' = 'desc',
    query?: string,
    status?: string,
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
        ...(isClient !== undefined && { is_client: isClient })
      };

      const response = await Axios.get('plincs', { params });
      return response.data as PlincResponse;
    } catch (error) {
      console.error('Error fetching all plincs:', error);
      throw error;
    }
  }
}

export const plincService = new PlincService();
