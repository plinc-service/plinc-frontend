import { useGraphStats } from "@/hooks/useDashboard";
import { AnalyticsChart } from "./AnalyticsChart";

export function AnalyticsChartWrapper() {
	const { data, isLoading, error } = useGraphStats();

	if (isLoading) return <div>Chargement...</div>;
	if (error) return <div>Erreur lors du chargement des données</div>;
	if (!data) return null;

	const filterOptions = [
		{ label: "PlinC", value: "plinc" },
		{ label: "Cashflow", value: "commission" },
	];


	const prepareChartData = (type: "plinc" | "commission") => {
		const selectedData = data[type];
		return selectedData.points.map((value, index) => ({
			name: selectedData.legends.month[index] || `Point ${index + 1}`,
			value: value,
		}));
	};

	const getCurrentPeriod = (type: "plinc" | "commission") => {
		const selectedData = data[type];
		const lastPeriod = selectedData.legends.month[selectedData.legends.month.length - 1];
		return lastPeriod.replace(",", " - ");
	};

	return (
		<AnalyticsChart
			title="Analyse des plincs"
			value={0}
			subtitle="Total PlinC"
			filterOptions={filterOptions}
			defaultFilter="plinc"
			data={prepareChartData("plinc")}
			currentPeriod={getCurrentPeriod("plinc")}
			color="#2563eb"
		/>
	);
}