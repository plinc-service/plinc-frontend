import { ChartData } from "@/interfaces/dashboardStatsInterface";
import { DashboardService } from "@/services/DashboardService";
import formatDonutChartData from "@/utils/formatGraphData";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
export const usePlincStats = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["plinc-stats"],
    queryFn: () => DashboardService.getPlincStats(),
  });

  const plincConfirmed = data?.confirmed;
  const plincWaiting = data?.waiting;
  const plincAccepted = data?.accepted;
  const plincRejected = data?.rejected;
  const plincDuring = data?.during;
  const plincShipped = data?.shipped;
  const plincLitiged = data?.litiged;
  const plincTerminated = data?.terminated;

  return {
    plincConfirmed,
    plincWaiting,
    plincAccepted,
    plincRejected,
    plincDuring,
    plincShipped,
    plincLitiged,
    plincTerminated,
    isLoading,
    error,
  };
};

export const useGlobalStats = () => {
  const [period, setPeriod] = useState<number>(1);
  const { data, isLoading, error } = useQuery({
    queryKey: ["global-stats", period],
    queryFn: () => DashboardService.getGlobalStats(period),
  });

  const userStats = data?.user;
  const serviceStats = data?.service;
  const plincStats = data?.plinc;
  const commissionStats = data?.commission;

  return {
    userStats,
    serviceStats,
    plincStats,
    commissionStats,
    period,
    setPeriod,
    isLoading,
    error,
  };
};

export const useChartData = () => {
  const { data, isLoading, error } = useQuery<ChartData, Error>({
    queryKey: ["chart-data"],
    queryFn: () => DashboardService.getChartData(),
  });

  const serviceChart = data?.service
    ? formatDonutChartData(data.service)
    : undefined;
  const venteChart = data?.vente ? formatDonutChartData(data.vente) : undefined;
  const commissionChart = data?.commission
    ? formatDonutChartData(data.commission)
    : undefined;

  return {
    serviceChart,
    venteChart,
    commissionChart,
    isLoading,
    error,
    rawData: data,
  };
};
