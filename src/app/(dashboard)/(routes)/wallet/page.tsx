"use client";

import TopBar from "@/components/layout/TopBar";
import { Button } from "@/components/ui/Button";
import { WalletCard } from "@/components/wallet/WalletCard";
import WalletDetailsPopup from "@/components/wallet/WalletDetailsPopup";
import WalletSkeleton from "@/components/wallet/WalletSkeleton";
import { useWallets } from "@/hooks/useWallets";
import { WalletDetails } from "@/interfaces/walletInterface";
import { WalletService } from "@/services/WalletService";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { WalletFilter } from "./components/WalletFilter";

export default function WalletPage() {
  const {
    wallets,
    loading,
    error,
    pagination,
    page,
    setPage,
    searchQuery,
    setSearchQuery,
    sortField,
    setSortField,
    sortOrder,
    setSortOrder,
    refetch
  } = useWallets();

  const [selectedWallet, setSelectedWallet] = useState<WalletDetails | null>(null);
  const [isPopupOpen, setPopupOpen] = useState(false);

  // Mise à jour de la page lors de changement de pagination
  useEffect(() => {
    setPage(page);
  }, [page, setPage]);

  const handleWalletClick = async (walletId: string) => {
    try {
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
      const prevPage = Number(
        new URL(pagination.previous).searchParams.get("page")
      );
      setPage(prevPage);
    }
  };

  const handleNext = () => {
    if (pagination.next) {
      const nextPage = Number(new URL(pagination.next).searchParams.get("page"));
      setPage(nextPage);
    }
  };

  return (
    <div className="px-5 pt-5 pb-[30px] flex flex-col h-full w-full">
      <TopBar pageName="Portefeuille" />
      
      {/* Filtre */}
      <WalletFilter 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        sortField={sortField}
        setSortField={setSortField}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        refetch={refetch}
      />
      
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
