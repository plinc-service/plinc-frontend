"use client";

import React from "react";

interface UserRevenueProps {
  current: number;
  total: number;
}

const UserRevenue: React.FC<UserRevenueProps> = ({ current, total }) => {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="bg-brand-lowest rounded-xl p-6">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-neutral-high text-base">Revenu en cours</h2>
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-base font-medium text-neutral-high">€</span>
        <span className="text-4xl font-bold text-blue">{current}</span>
      </div>
      <div className="mt-2 text-sm text-neutral-high">
        <span className="text-base">{total}€</span> au total
      </div>
    </div>
  );
};

export default UserRevenue;
