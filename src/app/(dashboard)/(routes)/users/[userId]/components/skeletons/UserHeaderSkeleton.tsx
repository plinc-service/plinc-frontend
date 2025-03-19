import { Separator } from "@/components/ui/Separator";
import { Skeleton } from "@/components/ui/Skeleton";

export default function UserHeaderSkeleton() {
  return (
    <div className="flex items-center justify-between mb-6 p-4">
      <div className="flex items-center gap-3">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>

      <div className="flex items-center">
        <div className="flex flex-col items-center px-6">
          <Skeleton className="h-8 w-16" />
          <Skeleton className="h-4 w-16 mt-1" />
        </div>

        <Separator orientation="vertical" className="h-12 bg-brand-lower" />

        <div className="flex flex-col items-center px-6">
          <Skeleton className="h-8 w-16" />
          <Skeleton className="h-4 w-16 mt-1" />
        </div>
      </div>
    </div>
  );
}
