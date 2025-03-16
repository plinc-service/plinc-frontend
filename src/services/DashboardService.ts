import {
  ChartApiResponse,
  ChartData,
  GlobalStatsResponse,
  PlincStatsResponse,
} from "@/interfaces/dashboardStatsInterface";
import Axios from "@/utils/config-axios";
export const DashboardService = {
  getPlincStats: async () => {
    try {
      const response = await Axios.get("/stats/plincs");
      const data = response.data as PlincStatsResponse;

      return data.data;
    } catch (error) {
      throw error;
    }
  },
  getGlobalStats: async (period: number) => {
    try {
      const response = await Axios.get("/stats/board", {
        params: {
          period,
        },
      });
      const data = response.data as GlobalStatsResponse;

      return data.data;
    } catch (error) {
      throw error;
    }
  },
  getChartData: async (): Promise<ChartData> => {
    const response = await Axios.get("/stats/chart");
    const data = response.data as ChartApiResponse;
    return data.data;
  },
};
