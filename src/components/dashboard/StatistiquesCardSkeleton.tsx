import { Skeleton } from "@/components/ui/Skeleton";

const StatistiquesCardSkeleton = () => {
	return (
		<div className="flex flex-col p-3 gap-3 border-black/10 border rounded-xl bg-white">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-4">
					<Skeleton className="w-1 h-12 rounded-full" />
					<div className="flex flex-col gap-[7px]">
						<Skeleton className="h-5 w-32" />
						<Skeleton className="h-8 w-20" />
					</div>
				</div>
				<div>
					<Skeleton className="w-7 h-7 rounded-full" />
				</div>
			</div>
			<Skeleton className="h-5 w-16" />
		</div>
	);
};

export default StatistiquesCardSkeleton;