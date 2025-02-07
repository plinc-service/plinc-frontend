import { Wallet } from "@/interfaces/walletInterface";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

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
        <Image
          src={wallet.image_url || "https://placehold.co/50x50/png"}
          alt={wallet.user.username}
          width={48}
          height={48}
          className="rounded-full"
        />
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
                {wallet.user.revenue_total || "00"}
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
