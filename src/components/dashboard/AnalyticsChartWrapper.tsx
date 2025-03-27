import { useGraphStats } from "@/hooks/useDashboard";
import { Skeleton } from "../ui/Skeleton";
import { AnalyticsChart } from "./AnalyticsChart";

export function AnalyticsChartWrapper() {
	const { data, isLoading, error } = useGraphStats();

	if (isLoading) {
		return (
			<div className="bg-blue-50/80 border-none shadow-sm rounded-xl p-4">
				<div className="flex justify-between items-center mb-4">
					<Skeleton className="h-6 w-40" />
					<Skeleton className="h-8 w-20" />
				</div>

				<div className="flex flex-col space-y-2 mb-4">
					<Skeleton className="h-10 w-32" />
					<Skeleton className="h-4 w-24" />
				</div>

				<Skeleton className="h-[250px] w-full rounded-lg" />
			</div>
		);
	}
	if (error) return <div>Erreur lors du chargement des données</div>;
	if (!data) return null;

	return <AnalyticsChart rawData={data} />;
}
