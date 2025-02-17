"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

const UserSkeleton = () => {
  return (
    <div className="space-y-2 px-2 mx-3 mt-4">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm">
        <Link href="/users" className="text-neutral-high text-base">
          Utilisateurs
        </Link>
        <ChevronRight className="h-4 w-4 text-neutral-high" />
        <div className="h-4 w-32 bg-neutral-100 rounded animate-pulse" />
        <ChevronRight className="h-4 w-4 text-neutral-high" />
        <div className="h-4 w-24 bg-neutral-100 rounded animate-pulse" />
      </div>

      <div className="bg-white rounded-2xl p-5 space-y-6">
        {/* User Header Skeleton */}
        <div className="space-y-4">
          {/* User Info */}
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              {/* Username */}
              <div className="h-6 w-48 bg-neutral-100 rounded animate-pulse" />
              {/* Email */}
              <div className="h-4 w-64 bg-neutral-100 rounded animate-pulse" />
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-8 mt-4">
            <div className="space-y-1">
              <div className="h-4 w-16 bg-neutral-100 rounded animate-pulse" />
              <div className="h-6 w-24 bg-neutral-100 rounded animate-pulse" />
            </div>
            <div className="space-y-1">
              <div className="h-4 w-16 bg-neutral-100 rounded animate-pulse" />
              <div className="h-6 w-24 bg-neutral-100 rounded animate-pulse" />
            </div>
          </div>
        </div>

        {/* Tabs Skeleton */}
        <div className="flex items-center gap-8 border-b border-neutral-200">
          <div className="h-8 w-24 bg-neutral-100 rounded animate-pulse" />
          <div className="h-8 w-24 bg-neutral-100 rounded animate-pulse" />
        </div>

        {/* Content Skeleton */}
        <div className="space-y-4">
          {Array.from({ length: 5 }, (_, index) => (
            <div key={index} className="flex items-center gap-4 p-4 border-b border-neutral-100">
              <div className="h-10 w-10 rounded-full bg-neutral-100 animate-pulse" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-48 bg-neutral-100 rounded animate-pulse" />
                <div className="h-3 w-32 bg-neutral-100 rounded animate-pulse" />
              </div>
              <div className="h-6 w-20 bg-neutral-100 rounded-full animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserSkeleton;
