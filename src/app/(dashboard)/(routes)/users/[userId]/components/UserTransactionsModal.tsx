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
    currentPage,
    setCurrentPage,
    totalPages
  } = useUserTransactions({ userId: userId as string });

  const handleClose = () => {
    onClose();
  };

  const handleFilterChange = (filter: string | null) => {
    setSelectedFilter(filter);
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
                placeholder="Rechercher par description, type ou montant"
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
              <DropdownMenuTrigger className={`flex items-center gap-2 border ${selectedFilter ? 'border-blue-300 bg-blue-50' : 'border-gray-200'} rounded-full px-4 py-2 text-sm ${selectedFilter ? 'text-blue-700' : 'text-gray-700'}`}>
                <span>
                  {selectedFilter === null && "Type"}
                  {selectedFilter === "paiement" && "Paiements"}
                  {selectedFilter === "retrait" && "Retraits"}
                  {selectedFilter === "depot" && "Dépôts"}
                </span>
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
                
                <DropdownMenuItem
                  onClick={() => handleFilterChange("depot")}
                  className={`${
                    selectedFilter === "depot"
                      ? "bg-blue-50 text-blue-500"
                      : ""
                  }`}
                >
                  Dépôts
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="mt-4 space-y-[18px] text-center">
            <ScrollArea className="h-[500px]">
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
            
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 pt-4">
                <button
                  className={`p-2 rounded ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-blue-500 hover:bg-blue-50'}`}
                  onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  &lt; Précédent
                </button>
                
                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    
                    return (
                      <button
                        key={i}
                        className={`w-8 h-8 flex items-center justify-center rounded-full ${
                          currentPage === pageNum
                            ? 'bg-blue-500 text-white'
                            : 'hover:bg-blue-50'
                        }`}
                        onClick={() => setCurrentPage(pageNum)}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>
                
                <button
                  className={`p-2 rounded ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-blue-500 hover:bg-blue-50'}`}
                  onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Suivant &gt;
                </button>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserTransactionsModal;
