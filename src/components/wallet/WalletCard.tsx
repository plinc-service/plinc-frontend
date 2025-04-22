import { Wallet } from "@/interfaces/walletInterface";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/Avatar";

interface WalletCardProps {
  wallet: Wallet;
  onClick: (walletId: string) => void;
}

export const WalletCard = React.forwardRef<HTMLDivElement, WalletCardProps>(
  ({ wallet, onClick, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex w-full justify-between group gap-2 rounded-3xl border border-neutral-low bg-background p-4 cursor-pointer",
        wallet.className
      )}
      {...props}
      onClick={() => onClick(String(wallet.id))}
    >
      <div className="space-y-1">
        <Avatar className="w-9 h-9">
          <AvatarImage src={wallet.user.image_url || undefined} alt={wallet.user.username} />
          <AvatarFallback>
            {wallet.user.username
              ? wallet.user.username
                .trim()
                .split(" ")
                .map((part) => part[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()
              : "AD"}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col justify-start">
          <h3 className="text-sm font-semibold text-blue-600">
            {wallet.user.username}
          </h3>
          <p className="text-neutral-high text-xs truncate max-w-[140px]">
            {wallet.user.email}
          </p>
        </div>
      </div>
      <div>
        <div className="flex flex-col justify-between h-full">
          <div className="flex flex-col items-end">
            <p className="text-neutral-high text-sm">Solde actuel</p>
            <p className="flex items-start">
              <span className="block">
                <Image
                  src="/icons/euro.svg"
                  alt="euro icon"
                  width={14}
                  height={14}
                />
              </span>
              <span className="text-2xl text-blue font-semibold">
                {wallet.amount || "00"}
              </span>
            </p>
          </div>

          {wallet.user.revenue_waiting !== null && (
            <p className="text-sm text-neutral-high mt-1 flex items-center gap-1">
              <span className="w-1 h-1 bg-badge-warning-bg rounded-full block"></span>{" "}
              <span className="text-xs block font-medium">
                {wallet.user.revenue_waiting || " "}€
              </span>{" "}
              <span className="block text-xxs">en cours</span>
            </p>
          )}
        </div>
      </div>
    </div>
  )
);
WalletCard.displayName = "WalletCard";
