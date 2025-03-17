"use client";

import { useUserTransactions } from "@/hooks/useUserTransactions";
import { MoveDiagonal, MoveDownRight, MoveUpRight } from "lucide-react";
import { useParams } from "next/navigation";
import React from "react";
import UserTransactionsModal from "./UserTransactionsModal";

const UserTransactions: React.FC = () => {
  const { userId } = useParams();
  const [mounted, setMounted] = React.useState(false);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const MAX_DISPLAYED_TRANSACTIONS = 6;

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", options);
  };

  const { 
    transactions, 
    isLoading, 
    error 
  } = useUserTransactions({ userId: userId as string });

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (!mounted) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="p-5 rounded-3xl border border-brand-lower animate-pulse">
        <div className="flex items-center justify-between mb-6">
          <div className="h-6 w-48 bg-neutral-200 rounded" />
          <div className="h-5 w-5 bg-neutral-200 rounded" />
        </div>
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="py-4 first:pt-0 last:pb-0">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-neutral-200" />
                <div className="flex-1 space-y-2">
                  <div className="h-5 w-32 bg-neutral-200 rounded" />
                  <div className="h-4 w-full bg-neutral-200 rounded" />
                  <div className="h-3 w-24 bg-neutral-200 rounded" />
                </div>
                <div className="h-5 w-16 bg-neutral-200 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const displayedTransactions = transactions.slice(0, MAX_DISPLAYED_TRANSACTIONS);

  return (
    <>
      <div className="p-5 rounded-3xl border border-brand-lower">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg text-neutral-high font-semibold">
            Historique des transactions
          </h2>
          <button 
            className="text-neutral-high hover:text-blue transition-colors"
            onClick={handleOpenModal}
            aria-label="Afficher les détails des transactions"
          >
            <MoveDiagonal className="h-5 w-5" />
          </button>
        </div>
        <div className="divide-y divide-brand-lower">
          {displayedTransactions.length === 0 ? (
            <div className="py-4 text-center text-neutral-high text-base">
              {error ? error : "Aucune donnée pour le moment"}
            </div>
          ) : (
            displayedTransactions.map((transaction) => (
              <div key={transaction.id} className="py-4 first:pt-0 last:pb-0">
                <div className="flex items-start gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${transaction.type === "retrait" ? "bg-red-50" : "bg-green-50"
                      }`}
                  >
                    <span
                      className={`${transaction.type === "retrait"
                          ? "text-red-500"
                          : "text-green-500"
                        }`}
                    >
                      {transaction.type === "retrait" ? (
                        <MoveUpRight className="h-4 w-4" />
                      ) : (
                        <MoveDownRight className="h-4 w-4" />
                      )}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium text-neutral-high">
                          {transaction.type === "retrait"
                            ? "Retrait"
                            : "Paiement"}
                        </h3>
                        <p className="text-sm text-neutral-medium mt-1">
                          {transaction.description || 'Aucune description disponible'}
                        </p>
                        <p className="text-xs text-neutral-high mt-1">
                          {formatDate(transaction.created_at)}
                        </p>
                      </div>
                      <span
                        className={`font-medium ${transaction.type === "retrait"
                            ? "text-red-500"
                            : "text-green-500"
                          }`}
                      >
                        {transaction.type === "retrait" ? "-" : "+"}
                        {transaction.amount}€
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      
      {/* Modal de détails des transactions */}
      <UserTransactionsModal 
        open={isModalOpen} 
        onClose={handleCloseModal} 
        transactions={transactions} 
      />
    </>
  );
};

export default UserTransactions;