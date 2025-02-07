"use client";

import { Separator } from "@/components/ui/separator";

export const UserProfileSkeleton = () => {
  return (
    <div className="bg-brand-lowest rounded-2xl p-5">
      <div className="h-6 w-24 bg-neutral-200 rounded mb-4" />

      <div className="flex m-2">
        <div className="flex flex-col items-center pr-4 w-[250px] relative">
          <div className="h-16 w-16 rounded-full bg-neutral-200" />

          <div className="mt-3 text-center w-full">
            <div className="h-6 w-32 bg-neutral-200 rounded mx-auto mb-2" />
            <div className="h-4 w-40 bg-neutral-200 rounded mx-auto" />
          </div>

          <div className="mt-4 w-full flex justify-around">
            <div className="flex flex-col items-center relative px-6">
              <div className="h-8 w-16 bg-neutral-200 rounded mb-1" />
              <div className="h-4 w-12 bg-neutral-200 rounded" />
              <Separator orientation="vertical" className="absolute right-0 h-12" />
            </div>
            <div className="flex flex-col items-center">
              <div className="h-8 w-16 bg-neutral-200 rounded mb-1" />
              <div className="h-4 w-12 bg-neutral-200 rounded" />
            </div>
          </div>
          <Separator orientation="vertical" className="absolute right-0 h-full" />

          <div className="h-10 w-full bg-neutral-200 rounded-full mt-4" />
        </div>

        <div className="flex-1 pl-4 px-4">
          <div className="grid grid-cols-2">
            <div className="space-y-1">
              <div className="h-4 w-20 bg-neutral-200 rounded" />
              <div className="h-5 w-32 bg-neutral-200 rounded" />
            </div>

            <div className="space-y-1">
              <div className="h-4 w-20 bg-neutral-200 rounded" />
              <div className="h-5 w-32 bg-neutral-200 rounded" />
            </div>
          </div>

          <div className="grid grid-cols-2 my-5">
            <div className="space-y-1">
              <div className="h-4 w-24 bg-neutral-200 rounded" />
              <div className="h-5 w-40 bg-neutral-200 rounded" />
            </div>

            <div className="space-y-1">
              <div className="h-4 w-24 bg-neutral-200 rounded" />
              <div className="h-5 w-40 bg-neutral-200 rounded" />
            </div>
          </div>

          <div className="grid grid-cols-1">
            <div className="space-y-1">
              <div className="h-4 w-16 bg-neutral-200 rounded" />
              <div className="h-5 w-48 bg-neutral-200 rounded" />
            </div>

            <div className="space-y-1 my-5">
              <div className="h-4 w-16 bg-neutral-200 rounded" />
              <div className="h-5 w-48 bg-neutral-200 rounded" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
