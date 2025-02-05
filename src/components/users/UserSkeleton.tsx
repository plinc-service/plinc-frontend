"use client";

const UserSkeleton = () => {
  return (
    <div className="flex items-center gap-4 p-4 border-b border-neutral-100">
      {/* Avatar skeleton */}
      <div className="w-9 h-9 rounded-full bg-neutral-100 animate-pulse" />
      
      {/* Content skeleton */}
      <div className="flex-1 space-y-3">
        <div className="flex items-center justify-between">
          {/* Username and email */}
          <div className="space-y-2 flex-1">
            <div className="h-4 w-32 bg-neutral-100 rounded animate-pulse" />
            <div className="h-3 w-48 bg-neutral-100 rounded animate-pulse" />
          </div>
          
          {/* Address */}
          <div className="h-4 w-24 bg-neutral-100 rounded animate-pulse" />
          
          {/* Date */}
          <div className="h-4 w-24 bg-neutral-100 rounded animate-pulse ml-4" />
        </div>
      </div>
    </div>
  );
};

export default UserSkeleton;
