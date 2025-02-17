"use client";

const PlinCSkeleton = () => {
  return (
    <div className="rounded-md">
      <div className="w-full">
        <div className="h-10 border-b border-neutral-low">
          <div className="flex items-center h-full px-4">
            {/* Header skeletons */}
            <div className="min-w-[80px] h-4 bg-neutral-100 rounded animate-pulse" />
            <div className="min-w-[150px] h-4 bg-neutral-100 rounded animate-pulse ml-8" />
            <div className="min-w-[150px] h-4 bg-neutral-100 rounded animate-pulse ml-8" />
            <div className="min-w-[100px] h-4 bg-neutral-100 rounded animate-pulse ml-8" />
            <div className="min-w-[100px] h-4 bg-neutral-100 rounded animate-pulse ml-8" />
            <div className="min-w-[80px] h-4 bg-neutral-100 rounded animate-pulse ml-8" />
            <div className="w-8 ml-auto" />
          </div>
        </div>

        {/* Rows */}
        <div className="divide-y">
          {Array.from({ length: 10 }, (_, index) => (
            <div key={index} className="flex items-center h-16 px-4">
              {/* ID skeleton */}
              <div className="min-w-[80px]">
                <div className="h-4 w-16 bg-neutral-100 rounded animate-pulse" />
              </div>

              {/* Provider skeleton */}
              <div className="flex items-center gap-3 min-w-[150px] ml-8">
                <div className="h-8 w-8 rounded-full bg-neutral-100 animate-pulse" />
                <div className="h-4 w-24 bg-neutral-100 rounded animate-pulse" />
              </div>

              {/* Service name skeleton */}
              <div className="min-w-[150px] ml-8">
                <div className="h-4 w-32 bg-neutral-100 rounded animate-pulse" />
              </div>

              {/* Date skeleton */}
              <div className="min-w-[100px] ml-8">
                <div className="h-4 w-24 bg-neutral-100 rounded animate-pulse" />
              </div>

              {/* Status skeleton */}
              <div className="min-w-[100px] ml-8">
                <div className="h-6 w-20 bg-neutral-100 rounded-full animate-pulse" />
              </div>

              {/* Amount skeleton */}
              <div className="min-w-[80px] ml-8">
                <div className="h-4 w-16 bg-neutral-100 rounded animate-pulse" />
              </div>

              {/* Action skeleton */}
              <div className="ml-auto">
                <div className="h-4 w-4 bg-neutral-100 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlinCSkeleton;
