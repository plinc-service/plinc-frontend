"use client";

export const UserRevenueSkeleton = () => {
  return (
    <div className="bg-brand-lowest rounded-xl p-6">
      <div className="flex items-center justify-between mb-2">
        <div className="h-5 w-32 bg-neutral-200 rounded" />
      </div>
      <div className="flex items-baseline gap-1">
        <div className="h-6 w-4 bg-neutral-200 rounded" />
        <div className="h-10 w-24 bg-neutral-200 rounded" />
      </div>
      <div className="mt-2">
        <div className="h-5 w-32 bg-neutral-200 rounded" />
      </div>
    </div>
  );
};
