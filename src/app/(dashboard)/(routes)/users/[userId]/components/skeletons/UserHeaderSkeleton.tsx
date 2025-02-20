import { Skeleton } from "@/components/ui/Skeleton";

export default function UserHeaderSkeleton() {
  return (
    <div className="p-6 border-b">
      <div className="flex items-center justify-between">
        <div className="space-y-4">
          {/* Username et email */}
          <Skeleton className="h-6 w-[200px]" />
          <Skeleton className="h-4 w-[150px]" />
        </div>

        {/* Stats */}
        <div className="flex gap-8">
          <div className="space-y-2">
            <Skeleton className="h-8 w-[100px]" />
            <Skeleton className="h-4 w-[60px]" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-8 w-[100px]" />
            <Skeleton className="h-4 w-[60px]" />
          </div>
        </div>
      </div>
    </div>
  );
}
