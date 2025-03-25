"use client";
import { useChartData } from "@/hooks/useDashboard";
import { DonutChartItem } from "@/interfaces/dashboardStatsInterface";
import { formatCurrency } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "../ui/Button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/DropdownMenu";
import { DonutGraph } from "./DonutGraph";

const FILTER_OPTIONS = [
	{
		value: 1,
		label: "Services",
		key: "serviceChart"
	},
	{
		value: 2,
		label: "Ventes",
		key: "venteChart"
	},
	{
		value: 3,
		label: "Cashflow",
		key: "commissionChart"
	}
]

const AnalysisOfPlincGraph = () => {
	const [selectedFilter, setSelectedFilter] = useState(FILTER_OPTIONS[0]);
	const { serviceChart, venteChart, commissionChart } = useChartData();

	const { activeData, totalRevenue, totalProfit } = useMemo(() => {
		let data = null;
		let revenue = 0;
		let profit = 0;

		if (selectedFilter.key === "serviceChart" && serviceChart) {
			data = serviceChart;
			revenue = serviceChart.total;
			profit = Math.round(revenue * 0.15);
		} else if (selectedFilter.key === "venteChart" && venteChart) {
			data = venteChart;
			revenue = venteChart.total;
			profit = Math.round(revenue * 0.25);
		} else if (selectedFilter.key === "commissionChart" && commissionChart) {
			data = commissionChart;
			revenue = commissionChart.total;
			profit = Math.round(revenue * 0.85);
		}

		return { activeData: data, totalRevenue: revenue, totalProfit: profit };
	}, [selectedFilter, serviceChart, venteChart, commissionChart]);

	const handleFilterChange = (value: number, label: string, key: string) => {
		setSelectedFilter({ value, label, key });
	};

	return (
		<div className="flex flex-col gap-5 p-4 rounded-[22px] bg-background border-[#EFEFEF] border w-full">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3.5">
					<h2 className="text-lg font-medium text-neutral-high">Analyse</h2>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" disabled={true} size="sm" className="bg-transparent hover:bg-transparent border-none">
								<span>Par Catégorie</span>
								<ChevronDown className="h-4 w-4 opacity-50" />
							</Button>
						</DropdownMenuTrigger>
					</DropdownMenu>
				</div>
				<div>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="outline" size="sm">
								<span>{selectedFilter.label}</span>
								<ChevronDown className="h-4 w-4 opacity-50" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							{FILTER_OPTIONS.map((option) => (
								<DropdownMenuItem key={option.value}
									onClick={() => handleFilterChange(option.value, option.label, option.key)}
									className={selectedFilter.value === option.value ? "bg-primary/10" : ""}
								>
									{option.label}
								</DropdownMenuItem>
							))}
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>

			<div className="grid grid-cols-2 gap-5">
				{selectedFilter.key === "commissionChart" ? (
					<>
						<div className="flex flex-col gap-1">
							<h3 className="text-sm font-medium text-neutral">CA Total</h3>
							<span className="text-[30px] font-semibold text-primary">{formatCurrency(totalRevenue)}€</span>
						</div>
						<div className="flex flex-col gap-1">
							<h3 className="text-sm font-medium text-neutral">Revenus</h3>
							<span className="text-[30px] font-semibold text-primary">{formatCurrency(totalProfit)}€</span>
						</div>
					</>
				) : selectedFilter.key === "venteChart" ? (
					<>
						<div className="flex flex-col gap-1">
							<h3 className="text-sm font-medium text-neutral">Ventes</h3>
							<span className="text-[30px] font-semibold text-primary">{venteChart?.total}</span>
						</div>
						<div className="flex flex-col gap-1">
							<h3 className="text-sm font-medium text-neutral">En cours</h3>
							<span className="text-[30px] font-semibold text-primary">{venteChart?.total}</span>
						</div>
					</>
				) : (
					<div className="flex flex-col gap-1">
						<h3 className="text-sm font-medium text-neutral">Total des services</h3>
						<span className="text-[30px] font-semibold text-primary">{serviceChart?.total}</span>
					</div>
				)}
			</div>

			<div className="grid grid-cols-2 items-center">
				<DonutGraph activeFilter={selectedFilter.key} />
				<div className="min-w-[269px]">
					<h3 className="text-base font-medium text-neutral mb-3">Légende</h3>
					<ul className="space-y-1 w-full">
						{activeData && activeData.items && activeData.items.map((item: DonutChartItem, index: number) => (
							<li key={index} className="flex justify-between items-center">
								<span className="flex items-center gap-1.5">
									<span
										className="w-[3.5px] h-[10px] block rounded-full"
										style={{ backgroundColor: item.color }}
									></span>
									<span className="text-base text-neutral">{item.category}</span>
								</span>
								<span className="flex items-center text-neutral-high">
									{item.percentage}% ({formatCurrency(item.value)}€)
								</span>
							</li>
						))}
						{(!activeData || !activeData.items || activeData.items.length === 0) && (
							<li className="text-neutral">Aucune donnée disponible</li>
						)}
					</ul>
				</div>
			</div>
		</div>
	)
}

export default AnalysisOfPlincGraph