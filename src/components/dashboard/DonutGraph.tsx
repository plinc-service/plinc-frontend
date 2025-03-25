"use client"

import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/Chart";
import { useChartData } from "@/hooks/useDashboard";
import { DonutChartItem } from "@/interfaces/dashboardStatsInterface";
import { useMemo } from "react";
import { Cell, Pie, PieChart } from "recharts";
import Spinner from "../ui/Spinner";

interface ChartDataItem {
	legend: string;
	percentage: number;
	fill: string;
	value: number;
	isZero?: boolean;
}

interface DonutGraphProps {
	activeFilter: string;
}

export function DonutGraph({ activeFilter = "serviceChart" }: DonutGraphProps) {
	const { serviceChart, venteChart, commissionChart, isLoading } = useChartData();

	const chartData = useMemo(() => {
		const selectedData = activeFilter === "serviceChart"
			? serviceChart
			: activeFilter === "venteChart"
				? venteChart
				: commissionChart;

		if (selectedData && selectedData.items && selectedData.items.length > 0) {
			const allZero = selectedData.items.every((item: DonutChartItem) => item.value === 0);

			if (allZero) {

				return selectedData.items.map((item: DonutChartItem) => ({
					legend: item.category,
					percentage: 100 / selectedData.items.length,
					fill: "#e0e0e0",
					value: 1,
					isZero: true
				}));
			}

			return selectedData.items.map((item: DonutChartItem) => ({
				legend: item.category,
				percentage: item.percentage,
				fill: item.color,
				value: item.value || 0.001,
				isZero: item.value === 0
			}));
		}
		return [];
	}, [activeFilter, serviceChart, venteChart, commissionChart]);

	const chartConfig = useMemo(() => {
		return chartData.reduce((config: Record<string, { label: string; color: string }>, item: ChartDataItem) => {
			return {
				...config,
				[item.legend]: {
					label: item.legend,
					color: item.fill,
				}
			};
		}, {}) as ChartConfig;
	}, [chartData]);

	if (isLoading) {
		return <div className="w-[250px] h-[250px] flex items-center justify-center">
			<Spinner />
		</div>;
	}

	if (chartData.length === 0) {
		return <div className="w-[250px] h-[250px] flex items-center justify-center">Aucune donnée disponible</div>;
	}

	const allZero = chartData.every((item: ChartDataItem) => item.isZero === true);

	return (
		<div className="w-[250px] pb-0 relative">
			<ChartContainer
				config={chartConfig}
				className={`aspect-square p-0 m-0 ${allZero ? 'opacity-70' : ''}`}
			>
				<PieChart>
					<ChartTooltip
						cursor={false}
						content={<ChartTooltipContent formatter={(value) =>
							allZero ? "Aucune données" : `${value} €`
						} />}
					/>
					<Pie
						data={chartData}
						dataKey="value"
						nameKey="legend"
						innerRadius={60}
						outerRadius={90}
						paddingAngle={2}
					>
						{chartData.map((entry, index) => (
							<Cell
								key={`cell-${index}`}
								fill={entry.isZero && !allZero ? "#f0f0f0" : entry.fill}
								opacity={entry.isZero && !allZero ? 0.6 : 1}
							/>
						))}
					</Pie>
				</PieChart>
			</ChartContainer>

			{allZero && (
				<div className="absolute inset-0 flex items-center justify-center pointer-events-none">
					<div className="text-center text-neutral-500 bg-opacity-70 p-2 rounded">
						<p className="text-xs">Aucune donnée</p>
					</div>
				</div>
			)}
		</div>
	);
}