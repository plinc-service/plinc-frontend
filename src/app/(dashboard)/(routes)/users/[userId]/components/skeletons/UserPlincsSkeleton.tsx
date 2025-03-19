import React from "react";
import { Skeleton } from "@/components/ui/Skeleton";
import DataTableSkeleton from "@/components/users/DataTableSkeleton";

export default function UserPlincsSkeleton() {
  return (
    <div className="rounded-2xl p-2">
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-1">
          <Skeleton className="h-9 w-20 rounded-md" />
          <Skeleton className="h-9 w-20 rounded-md" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-10 w-[280px] rounded-full" />
          <Skeleton className="h-10 w-32 rounded-full" />
        </div>
      </div>
      <DataTableSkeleton />
    </div>
  );
}
