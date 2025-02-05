"use client";

import { WalletCard } from "@/components/wallet/WalletCard";
import WalletSkeleton from "@/components/wallet/WalletSkeleton";
import { useWallets } from "@/hooks/useWallets";
import { useState } from "react";

export default function WalletPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const { wallets, loading, error, pagination } = useWallets(currentPage);

  const skeletons = Array.from({ length: 20 }, (_, index) => (
    <WalletSkeleton key={`skeleton-${index}`} />
  ));

  if (loading) {
    return (
      <div className="px-5 pt-5 pb-[30px]">
        <div className="grid grid-cols-4 gap-4">{skeletons}</div>
      </div>
    );
  }

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
    <div className="px-5 pt-5 pb-[30px]">
      <ul className="grid grid-cols-4 gap-4">
        {wallets.map((wallet) => (
          <WalletCard key={wallet.id} wallet={wallet} />
        ))}
      </ul>
      {/* Pagination */}
      <div style={{ marginBottom: "20px" }}>
        {pagination.previous && (
          <button onClick={handlePrevious}>Précédent</button>
        )}
        {pagination.next && <button onClick={handleNext}>Suivant</button>}
      </div>
    </div>
  );
}
