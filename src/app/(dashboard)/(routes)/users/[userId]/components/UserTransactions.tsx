"use client";

import { useUserTransactions } from "@/hooks/useUserTransactions";
import { Transaction } from "@/interfaces/transactionInterface";
import { FormattedDate } from "@/utils/formatDate";
import { ArrowDownUp, MoveDiagonal, MoveDownRight, MoveUpRight } from "lucide-react";
import { useParams } from "next/navigation";
import React, { memo } from "react";
import Spinner from "@/components/ui/Spinner";
import UserTransactionsModal from "./UserTransactionsModal";

interface UserTransactionItemProps {
  transaction: Transaction;
}

const LoadingState = () => (
  <div className="flex-1 flex justify-center items-center">
    <Spinner />
  </div>
);

const ErrorState = ({ error }: { error: string }) => (
  <p className="text-sm text-danger">{error}</p>
);

const EmptyState = () => (
  <div className="flex-1 flex justify-center items-center">
    <p className="text-sm text-neutral-medium">Aucune donnée pour le moment.</p>
  </div>
);

const UserTransactionItem: React.FC<UserTransactionItemProps> = memo(({ transaction }) => {
 
  const transactionType = transaction.type.toLowerCase();
  const isWithdrawal = transactionType === "retrait";
  const isDeposit = transactionType === "depot";
  
 
  let iconColorClass = "bg-success-background border-success-border";
  let amountColorClass = "text-success";
  
  if (isWithdrawal) {
    iconColorClass = "bg-danger-background border-danger-border";
    amountColorClass = "text-danger";
  } else if (isDeposit) {
    iconColorClass = "bg-neutral-background border-neutral-border";
    amountColorClass = "text-neutral-high";
  }

  return (
    <div
      className="flex flex-col items-start justify-between gap-2.5 h-[85px] border-b border-neutral-low pb-[18px] mb-[18px]"
    >
      <div className="flex items-center w-full justify-between">
        <div className="flex items-center gap-2">
          <span
            className={`${iconColorClass} border rounded-full w-7 h-7 flex items-center justify-center`}
          >
            {isWithdrawal ? (
              <MoveUpRight className="text-danger" size={16} />
            ) : isDeposit ? (
              <ArrowDownUp className="text-neutral-high" size={16} />
            ) : (
              <MoveDownRight className="text-success" size={16} />
            )}
          </span>
          <div className="text-left min-w-0 flex-1">
            <h5 className="text-base font-semibold text-neutral-high">
              {isWithdrawal ? "Retrait" : isDeposit ? "Dépôt" : "Paiement"}
            </h5>
            <p className="text-sm text-neutral-high truncate max-w-[600px]">
            {transaction.user.services?.[0]?.description || "Aucune description"}
            </p>
          </div>
        </div>
        <span className={`${amountColorClass} block text-base`}>
          {isWithdrawal ? "-" : isDeposit ? "" : "+"}
          {transaction.amount}€
        </span>
      </div>
      <span className="text-neutral-high text-sm">
        <FormattedDate dateString={transaction.created_at} />
      </span>
    </div>
  );
});

UserTransactionItem.displayName = "UserTransactionItem";

const UserTransactions: React.FC = () => {
  const { userId } = useParams();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const MAX_DISPLAYED_TRANSACTIONS = 5;

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

        <div className="mt-4 space-y-[18px] text-center">
          {isLoading ? (
            <LoadingState />
          ) : error ? (
            <ErrorState error={error} />
          ) : displayedTransactions.length === 0 ? (
            <EmptyState />
          ) : (
            displayedTransactions.map((transaction) => (
              <UserTransactionItem
                key={transaction.id}
                transaction={transaction}
              />
            ))
          )}
        </div>
      </div>
      
      {/* Modal de détails des transactions */}
      <UserTransactionsModal 
        open={isModalOpen} 
        onClose={handleCloseModal} 
      />
    </>
  );
};

export default UserTransactions;