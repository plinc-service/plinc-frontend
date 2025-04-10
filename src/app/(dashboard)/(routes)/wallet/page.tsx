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
import { useState } from "react";
import { WalletFilter } from "./components/WalletFilter";

export default function WalletPage() {
  const {
    data: wallets,
    loading,
    error,
    page,
    searchQuery,
    setSearchQuery,
    goToNextPage,
    goToPreviousPage,
    goToPage,
    sortField,
    setSortField,
    sortOrder,
    setSortOrder,
    totalPages,
    refetch
  } = useWallets();

  const [selectedWallet, setSelectedWallet] = useState<WalletDetails | null>(null);
  const [isPopupOpen, setPopupOpen] = useState(false);

  const getPaginationItems = () => {
    const items = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        items.push(i);
      }
    } else {
      const startPage = Math.max(1, page - Math.floor(maxVisiblePages / 2));
      const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

      if (startPage > 1) {
        items.push('...');
      }

      for (let i = startPage; i <= endPage; i++) {
        items.push(i);
      }

      if (endPage < totalPages) {
        items.push('...');
      }
    }

    return items;
  };

  const paginationItems = getPaginationItems();

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
        <div className="flex items-center justify-between py-4">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 text-sm text-neutral-high"
            onClick={goToPreviousPage}
            disabled={page === 1 || !wallets.length}
          >
            <ChevronLeft className="mr-1 h-4 w-4 text-neutral-high" />
            Précédent
          </Button>
          <div className="flex items-center gap-1">
            {paginationItems.map((item, index) => (
              typeof item === 'number' ? (
                <Button
                  key={`page-${item}`}
                  variant={page === item ? "default" : "ghost"}
                  size="icon"
                  className={`h-8 w-8 text-sm ${page === item
                    ? "bg-primary/10 hover:bg-primary/20 text-primary"
                    : "text-muted-foreground hover:text-foreground"
                    }`}
                  onClick={() => goToPage(item)}
                >
                  {item}
                </Button>
              ) : (
                <span key={`ellipsis-${index}`} className="px-2">...</span>
              )
            ))}
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 text-sm text-neutral-high"
            onClick={goToNextPage}
            disabled={page === totalPages || !wallets.length}
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
