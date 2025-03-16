export interface PlincStats {
  total: number;
  total_price: number;
  percentage: number;
  commision: number;
}

export interface PlincTypeStats {
  waiting: PlincStats;
  accepted: PlincStats;
  rejected: PlincStats;
  confirmed: PlincStats;
  during: PlincStats;
  shipped: PlincStats;
  litiged: PlincStats;
  terminated: PlincStats;
}

export interface PlincStatsResponse {
  success: boolean;
  data: PlincTypeStats;
}

export interface GlobalStats {
  total: number;
  percentage: number;
  increased: boolean;
}

export interface GlobalStatsType {
  user: GlobalStats;
  service: GlobalStats;
  plinc: GlobalStats;
  commission: GlobalStats;
}

export interface GlobalStatsResponse {
  success: boolean;
  data: GlobalStatsType;
}

export interface ChartCategory {
  total: number;
  categories: string[];
  colors: string[];
  values: number[];
}

export interface ChartData {
  service: ChartCategory;
  vente: ChartCategory;
  commission: ChartCategory;
}

export interface ChartApiResponse {
  success: boolean;
  data: ChartData;
  previous: string | null;
  next: string | null;
  total_pages: number;
}

export interface DonutChartItem {
  category: string;
  value: number;
  color: string;
  percentage: number;
}

export interface FormattedDonutChartData {
  items: DonutChartItem[];
  total: number;
}
