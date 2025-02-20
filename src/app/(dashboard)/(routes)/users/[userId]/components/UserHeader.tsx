"use client";

import React from "react";
import Image from "next/image";
import { Separator } from "@/components/ui/Separator";

interface UserHeaderProps {
  user: {
    username: string;
    email: string;
    stats: {
      acheter: number;
      vendeurs: number;
    };
  };
}

const UserHeader: React.FC<UserHeaderProps> = ({ user }) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 rounded-full bg-neutral-100 flex items-center justify-center overflow-hidden">
          <Image
            src="/avatar.svg"
            alt={user.username}
            width={48}
            height={48}
            className="rounded-full"
          />
        </div>
        <div>
          <h2 className="text-base font-semibold text-neutral-high">
            {user.username}
          </h2>
          <p className="text-sm text-neutral-medium">{user.email}</p>
        </div>
      </div>

      <div className="flex items-center">
        <div className="flex flex-col items-center px-6">
          <span className="text-2xl font-semibold text-neutral-high">
            {user.stats.acheter}
          </span>
          <span className="text-sm text-neutral-medium">Achetés</span>
        </div>

        <Separator orientation="vertical" className="h-12 bg-brand-lower" />

        <div className="flex flex-col items-center px-6">
          <span className="text-2xl font-semibold text-neutral-high">
            {user.stats.vendeurs}
          </span>
          <span className="text-sm text-neutral-medium">Vendus</span>
        </div>
      </div>
    </div>
  );
};

export default UserHeader;
