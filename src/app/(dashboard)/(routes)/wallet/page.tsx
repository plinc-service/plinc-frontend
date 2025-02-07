"use client";

import TopBar from "@/components/layout/TopBar";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { WalletCard } from "@/components/wallet/WalletCard";
import WalletDetailsPopup from "@/components/wallet/WalletDetailsPopup";
import WalletSkeleton from "@/components/wallet/WalletSkeleton";
import { useWallets } from "@/hooks/useWallets";
import { WalletDetails } from "@/interfaces/walletInterface";
import { WalletService } from "@/services/WalletService";
import {
  AlignCenter,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Search,
} from "lucide-react";
import { useState } from "react";

export default function WalletPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const { wallets, loading, error, pagination } = useWallets(currentPage);
  const [selectedWallet, setSelectedWallet] = useState<WalletDetails | null>(
    null
  );
  const [isPopupOpen, setPopupOpen] = useState(false);

  const handleWalletClick = async (walletId: string) => {
    try {
      console.log("Détails du wallet :");
      const walletDetails: WalletDetails =
        await WalletService.fetchWalletDetails(walletId);

      setSelectedWallet(walletDetails);
      setPopupOpen(true);
    } catch (error) {
      console.error("Erreur lors du chargement des détails du wallet :", error);
    }
  };

  if (error) {
    return (
      <div className="px-5 py-5">
        <div className="bg-red-50 border-l-4 border-red-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handlePrevious = () => {
    if (pagination.previous) {
      const page = Number(
        new URL(pagination.previous).searchParams.get("page")
      );
      setCurrentPage(page);
    }
  };

  const handleNext = () => {
    if (pagination.next) {
      const page = Number(new URL(pagination.next).searchParams.get("page"));
      setCurrentPage(page);
    }
  };

  return (
    <div className="px-5 pt-5 pb-[30px] flex flex-col h-full w-full">
      <TopBar pageName="Portefeuille" />
      <div className="flex items-center justify-between mt-4">
        <div className="relative flex-1 max-w-[610px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-input-placeholder" />
          <Input placeholder="Rechercher" className="pl-9 h-10" />
        </div>
        <div className="flex items-center gap-2">
          <div className="relative flex-1 max-w-[95px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-high" />
            <Input placeholder="Label" className="pl-9 h-10" />
          </div>
          <Button
            variant="outline"
            className="h-10 px-4 flex items-center gap-2 border border-neutral-low rounded-full"
          >
            <AlignCenter className="h-4 w-4" />
            <span>Trier par</span>
            <ChevronDown className="h-4 w-4 text-neutral-high" />
          </Button>
        </div>
      </div>
      <div className="flex flex-col justify-between mt-5 flex-1">
        <ul className="grid grid-cols-4 gap-4">
          {loading
            ? Array.from({ length: 16 }, (_, index) => (
                <WalletSkeleton key={`skeleton-${index}`} />
              ))
            : wallets.map((wallet) => (
                <WalletCard
                  key={wallet.id}
                  wallet={wallet}
                  onClick={handleWalletClick}
                />
              ))}
        </ul>
        {/* Pagination */}
        <div className="w-full flex item-center justify-between mt-5">
          <Button
            variant="ghost"
            size="sm"
            onClick={handlePrevious}
            disabled={!pagination.previous}
            className="h-8 text-sm text-neutral-high"
          >
            <ChevronLeft className="ml-1 h-4 w-4 text-neutral-high" />
            Précédent
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleNext}
            disabled={!pagination.next}
            className="h-8 text-sm text-neutral-high"
          >
            Suivant
            <ChevronRight className="ml-1 h-4 w-4 text-neutral-high" />
          </Button>
        </div>
      </div>
      {/* Popup des détails du wallet */}
      <WalletDetailsPopup
        open={isPopupOpen}
        onClose={() => setPopupOpen(false)}
        walletDetails={selectedWallet}
      />
    </div>
  );
}
