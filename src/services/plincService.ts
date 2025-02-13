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
}

export const plincService = new PlincService();
