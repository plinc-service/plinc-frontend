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
  async getUserPlincs(userId: string, type: 'bought' | 'sold', page: number = 1): Promise<PlincResponse> {
    try {
      const response = await Axios.get('/plincs', {
        params: {
          user: userId,
          type: type,
          page: page,
        },
      });

      return response.data as PlincResponse;
    } catch (error) {
      console.error('Error fetching plincs:', error);
      throw error;
    }
  }

  private getStatusQueryParam(filterStatus: string): string | undefined {
    const statusMap: Record<string, string> = {
      'en-attente': 'pending',
      'accepte': 'accepted',
      'confirme': 'confirmed',
      'en-cours': 'in_progress',
      'termine': 'completed',
      'annule': 'cancelled',
      'rejete': 'rejected'
    };
    return filterStatus !== 'all' ? statusMap[filterStatus] : undefined;
  }

  async getAllPlincs(page: number = 1, filterStatus: string = 'all'): Promise<PlincResponse> {
    try {
      const params: Record<string, string | number> = { page };
      const status = this.getStatusQueryParam(filterStatus);
      if (status) {
        params.status = status;
      }

      const response = await Axios.get('/plincs', { params });
      return response.data as PlincResponse;
    } catch (error) {
      console.error('Error fetching all plincs:', error);
      throw error;
    }
  }
}

export const plincService = new PlincService();
