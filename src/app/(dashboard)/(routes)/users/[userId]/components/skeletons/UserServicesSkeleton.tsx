"use client";

export const UserServicesSkeleton = () => {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="h-6 w-32 bg-neutral-200 rounded" />
        <div className="h-9 w-28 bg-neutral-200 rounded" />
      </div>
      
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-4 p-4 border border-brand-lower rounded-xl">
            <div className="h-12 w-12 bg-neutral-200 rounded-lg" />
            <div className="flex-1">
              <div className="h-5 w-48 bg-neutral-200 rounded mb-2" />
              <div className="h-4 w-32 bg-neutral-200 rounded" />
            </div>
            <div className="h-8 w-24 bg-neutral-200 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
};
