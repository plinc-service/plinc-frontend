"use client";

export const UserTransactionsSkeleton = () => {
  return (
    <div className="bg-brand-lowest rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="h-6 w-40 bg-neutral-200 rounded" />
        <div className="h-9 w-28 bg-neutral-200 rounded" />
      </div>

      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-neutral-200 rounded-full" />
              <div>
                <div className="h-5 w-32 bg-neutral-200 rounded mb-1" />
                <div className="h-4 w-24 bg-neutral-200 rounded" />
              </div>
            </div>
            <div className="h-6 w-20 bg-neutral-200 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
};
