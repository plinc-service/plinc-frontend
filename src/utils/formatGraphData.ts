import { FormattedDonutChartData } from "@/interfaces/dashboardStatsInterface";

import {
  ChartCategory,
  DonutChartItem,
} from "@/interfaces/dashboardStatsInterface";

const formatDonutChartData = (
  chartCategory: ChartCategory
): FormattedDonutChartData => {
  const items: DonutChartItem[] = chartCategory.categories.map(
    (category: string, index: number) => {
      const value = chartCategory.values[index];
      const percentage =
        chartCategory.total > 0 ? (value / chartCategory.total) * 100 : 0;

      return {
        category,
        value,
        color: chartCategory.colors[index],
        percentage,
      };
    }
  );

  return {
    items,
    total: chartCategory.total,
  };
};

export default formatDonutChartData;
