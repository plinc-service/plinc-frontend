"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/Dialog";
import { useUserTransactions } from "@/hooks/useUserTransactions";
import { Transaction } from "@/interfaces/transactionInterface";
import {
  ArrowDownUp,
  CalendarIcon,
  ChevronDown,
  MoveDownRight,
  MoveUpRight,
  Search,
  X,
} from "lucide-react";
import { memo } from "react";
import { useParams } from "next/navigation";
import { ScrollArea, ScrollBar } from "@/components/ui/ScrollArea";
import Spinner from "@/components/ui/Spinner";
import { FormattedDate } from "@/utils/formatDate";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";

interface UserTransactionsModalProps {
  open: boolean;
  onClose: () => void;
}

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
  const isWithdrawal = transaction.type.toLowerCase() === "retrait";
  const iconColorClass = isWithdrawal
    ? "bg-danger-background border-danger-border"
    : "bg-success-background border-success-border";
  const amountColorClass = isWithdrawal ? "text-danger" : "text-success";

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
            ) : (
              <MoveDownRight className="text-success" size={16} />
            )}
          </span>
          <div className="text-left min-w-0 flex-1">
            <h5 className="text-base font-semibold text-neutral-high">
              {isWithdrawal ? "Retrait" : "Paiement"}
            </h5>
            <p className="text-sm text-neutral-high truncate max-w-[600px]">
              {transaction.description || "Aucune description"}
            </p>
          </div>
        </div>
        <span className={`${amountColorClass} block text-base`}>
          {isWithdrawal ? "-" : "+"}
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

const UserTransactionsModal: React.FC<UserTransactionsModalProps> = ({
  open,
  onClose,
}) => {
  const { userId } = useParams();
  const {
    transactions,
    isLoading,
    error,
    searchQuery,
    setSearchQuery,
    selectedFilter,
    setSelectedFilter,
    sortOrder,
    setSortOrder,
    sortField,
    setSortField,
  } = useUserTransactions({ userId: userId as string });

  const handleClose = () => {
    onClose();
  };

  const handleFilterChange = (filter: string | null) => {
    setSelectedFilter(filter === selectedFilter ? null : filter);
  };

  const handleSortChange = (field: "created_at" | "amount") => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("desc");
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-[700px] w-full">
        <div className="space-y-4">
          {/* HEADER */}
          <div className="flex justify-between items-center">
            <DialogTitle className="text-lg text-neutral-high font-medium">
              Historique des transactions
            </DialogTitle>
            <button
              className="hover:text-[#94A3B8] cursor-pointer"
              onClick={onClose}
            >
              <X />
            </button>
          </div>

          {/* Barre de recherche et tri */}
          <div className="flex items-center gap-4 flex-wrap">
            <div className="relative flex-1 min-w-[200px]">
              <input
                type="text"
                placeholder="Rechercher"
                className="w-full p-2 pl-10 border border-gray-200 rounded-full text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 border border-gray-200 rounded-full px-4 py-2 text-sm text-gray-700">
                <span>Trier par</span>
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-44">
                <DropdownMenuItem
                  onClick={() => handleSortChange("created_at")}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4" />
                    <span>Date</span>
                  </div>
                  {sortField === "created_at" && (
                    <ArrowDownUp
                      className={`h-4 w-4 ${
                        sortOrder === "desc" ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleSortChange("amount")}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <span>€</span>
                    <span>Montant</span>
                  </div>
                  {sortField === "amount" && (
                    <ArrowDownUp
                      className={`h-4 w-4 ${
                        sortOrder === "desc" ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 border border-gray-200 rounded-full px-4 py-2 text-sm text-gray-700">
                <span>Type</span>
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-44">
                <DropdownMenuItem
                  onClick={() => handleFilterChange(null)}
                  className={`${
                    !selectedFilter ? "bg-blue-50 text-blue-500" : ""
                  }`}
                >
                  Tous
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleFilterChange("paiement")}
                  className={`${
                    selectedFilter === "paiement"
                      ? "bg-blue-50 text-blue-500"
                      : ""
                  }`}
                >
                  Paiements
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => handleFilterChange("retrait")}
                  className={`${
                    selectedFilter === "retrait"
                      ? "bg-blue-50 text-blue-500"
                      : ""
                  }`}
                >
                  Retraits
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Liste des transactions */}
          <div className="mt-4 space-y-[18px] text-center">
            <ScrollArea className="h-[600px]">
              {isLoading ? (
                <LoadingState />
              ) : error ? (
                <ErrorState error={error} />
              ) : transactions.length === 0 ? (
                <EmptyState />
              ) : (
                transactions.map((transaction) => (
                  <UserTransactionItem
                    key={transaction.id}
                    transaction={transaction}
                  />
                ))
              )}
              <ScrollBar orientation="vertical" />
            </ScrollArea>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserTransactionsModal;
