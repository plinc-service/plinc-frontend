import { Skeleton } from "@/components/ui/Skeleton";

const PlincStatsCardSkeleton = () => {
	return (
		<div className="flex flex-col p-3 gap-3 border-black/5 border rounded-xl">
			<div className="flex items-center justify-between">
				<div className="text-sm font-bold flex items-center gap-2">
					<Skeleton className="w-2.5 h-2.5 rounded-full" />
					<Skeleton className="h-5 w-24" />
				</div>
				<Skeleton className="h-7 w-10 rounded-full" />
			</div>

			<div>
				<Skeleton className="h-6 w-20" />
			</div>

			<div className="flex justify-start items-center w-full relative">
				<div className="flex items-center gap-0.5">
					<Skeleton className="h-7 w-16" />
					<Skeleton className="h-4 w-4" />
					<Skeleton className="h-4 w-20" />
				</div>
				<div className="absolute right-0 bottom-0">
					<Skeleton className="w-11 h-11 rounded-full" />
				</div>
			</div>
		</div>
	);
};

export default PlincStatsCardSkeleton;