"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchUserById } from "@/services/UserService";

const UserRevenue: React.FC = () => {
  const { userId } = useParams();
  const [mounted, setMounted] = React.useState(false);

  const { data: user, isLoading } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => fetchUserById(userId as string),
    enabled: mounted && !!userId,
  });

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="bg-brand-lowest rounded-xl p-6 animate-pulse">
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
  }

  return (
    <div className="bg-brand-lowest rounded-xl p-6">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-neutral-high text-base">Revenu en cours</h2>
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-base font-medium text-neutral-high">€</span>
        <span className="text-4xl font-bold text-blue">{user?.revenue_waiting || 0}</span>
      </div>
      <div className="mt-2 text-sm text-neutral-high">
        <span className="text-base">{user?.revenue_total || 0}€</span> au total
      </div>
    </div>
  );
};

export default UserRevenue;
