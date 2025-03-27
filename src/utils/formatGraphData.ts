import { FormattedDonutChartData } from "@/interfaces/dashboardStatsInterface";

import {
  ChartCategory,
  DonutChartItem,
} from "@/interfaces/dashboardStatsInterface";

const formatDonutChartData = (
  chartCategory: ChartCategory
): FormattedDonutChartData => {
  const totalValue = chartCategory.values.reduce((acc, val) => acc + val, 0);

  const items: DonutChartItem[] = chartCategory.categories.map(
    (category: string, index: number) => {
      const value = chartCategory.values[index];
      const percentage =
        totalValue > 0 ? Math.round((value / totalValue) * 100) : 0;

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
    second_data: chartCategory.second_data,
  };
};

export default formatDonutChartData;
