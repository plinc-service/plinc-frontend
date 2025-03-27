"use client"

import {
	ChartConfig,
	ChartContainer
} from "@/components/ui/Chart";
import { useChartData } from "@/hooks/useDashboard";
import { DonutChartItem } from "@/interfaces/dashboardStatsInterface";
import { useMemo } from "react";
import { Cell, Pie, PieChart, Tooltip } from "recharts";
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
			return selectedData.items.map((item: DonutChartItem) => ({
				legend: item.category,
				percentage: item.percentage,
				fill: item.color,
				value: item.value || 0.000,
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

	const hasData = chartData.some((item) => !item.isZero);

	if (isLoading) {
		return (
			<div className="w-[250px] h-[250px] flex items-center justify-center">
				<Spinner />
			</div>
		);
	}

	if (chartData.length === 0) {
		return (
			<div className="w-[250px] h-[250px] flex items-center justify-center">
				Aucune donnée disponible
			</div>
		);
	}

	return (
		<div className="w-[250px] pb-0 relative">
			<ChartContainer
				config={chartConfig}
				className={`aspect-square p-0 m-0 ${hasData ? "opacity-70" : ""}`}
			>
				{hasData ? (
					<PieChart>
						<Tooltip
							content={({ active, payload }) => {
								if (!active || !payload || !payload.length) return null;

								return (
									<div className="bg-white p-2 border rounded shadow text-xs text-neutral-high">
										<p>{payload[0].name}</p>
										<p>{payload[0].value} €</p>
									</div>
								);
							}}
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
									fill={entry.fill}
									opacity={1}
								/>
							))}
						</Pie>
					</PieChart>
				) : (
					<div className="w-[250px] h-[250px] flex items-center justify-center text-neutral text-sm">
						Aucune donnée à afficher
					</div>
				)}
			</ChartContainer>
		</div>
	);
}
