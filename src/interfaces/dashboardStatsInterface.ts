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
  second_data?: number;
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
  second_data?: number;
}

// Dashboard Graph Interface

export interface GraphData {
  plinc: PointData;
  commission: PointData;
}

export interface PointData {
  first_point: number;
  second_point: number;
  third_point: number;
  fourth_point: number;
  month_legend: string;
  year_legend: string;
  "3_month_legend": string;
}

export interface GraphApiResponse {
  success: boolean;
  data: GraphData;
  previous: null | string;
  next: null | string;
  total_pages: number;
}

export interface DataPoint {
  name: string;
  value: number;
  date?: string;
  [key: string]: unknown;
}

export interface FilterOption {
  label: string;
  value: string;
}

export interface AnalyticsChartProps {
  title: string;
  value: number;
  currency?: string;
  subtitle?: string;
  data: DataPoint[];
  currentPeriod?: string;
  filterOptions?: FilterOption[];
  filterLabel?: string;
  defaultFilter?: string;
  valuePrefix?: number;
  valueSuffix?: number;
  color?: string;
  onPointClick?: (index: number) => void;
  onFilterChange?: (filter: string) => void;
}
