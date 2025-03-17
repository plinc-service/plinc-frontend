"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/Dialog";
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
import { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";

interface UserTransactionsModalProps {
  open: boolean;
  onClose: () => void;
  transactions: Transaction[];
}

const UserTransactionsModal: React.FC<UserTransactionsModalProps> = ({
  open,
  onClose,
  transactions,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTransactions, setFilteredTransactions] =
    useState<Transaction[]>(transactions);
  const [sortField, setSortField] = useState<"created_at" | "amount">(
    "created_at"
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setFilteredTransactions(transactions);
      setSearchQuery("");
      setSortField("created_at");
      setSortOrder("desc");
      setSelectedFilter(null);
    }
  }, [open, transactions]);

  useEffect(() => {
    if (!open) return;

    let result = [...transactions];

    // console.log('Filtrage :', {
    //   selectedFilter,
    //   transactionTypes: result.map(t => t.type)
    // });

    if (selectedFilter) {
      if (selectedFilter === "paiement") {
        result = result.filter(
          (transaction) => transaction.type.toLowerCase() !== "retrait"
        );
      } else {
        result = result.filter(
          (transaction) =>
            transaction.type.toLowerCase() === selectedFilter.toLowerCase()
        );
      }
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (transaction) =>
          transaction.description?.toLowerCase().includes(query) ||
          transaction.type.toLowerCase().includes(query) ||
          transaction.amount.toString().includes(query)
      );
    }

    result.sort((a, b) => {
      if (sortField === "created_at") {
        return sortOrder === "asc"
          ? new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
          : new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      } else {
        return sortOrder === "asc" ? a.amount - b.amount : b.amount - a.amount;
      }
    });

    setFilteredTransactions(result);
  }, [open, transactions, searchQuery, selectedFilter, sortField, sortOrder]);

  const handleClose = () => {
    onClose();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const days = [
      "Dimanche",
      "Lundi",
      "Mardi",
      "Mercredi",
      "Jeudi",
      "Vendredi",
      "Samedi",
    ];
    const months = [
      "Janvier",
      "Février",
      "Mars",
      "Avril",
      "Mai",
      "Juin",
      "Juillet",
      "Août",
      "Septembre",
      "Octobre",
      "Novembre",
      "Décembre",
    ];

    const dayName = days[date.getDay()];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${dayName} ${day} ${month} à ${hours}:${minutes}`;
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
          <div className="space-y-4 max-h-[600px] overflow-y-auto">
            {filteredTransactions.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-neutral-high text-base">
                  {searchQuery || selectedFilter
                    ? "Aucune transaction ne correspond à votre recherche"
                    : "Aucune transaction pour le moment"}
                </p>
              </div>
            ) : (
              filteredTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="border-b border-gray-100 pb-4 last:border-0"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        transaction.type === "retrait"
                          ? "bg-red-50"
                          : "bg-green-50"
                      }`}
                    >
                      {transaction.type === "retrait" ? (
                        <MoveUpRight className="h-4 w-4 text-red-500" />
                      ) : (
                        <MoveDownRight className="h-4 w-4 text-green-500" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-medium text-gray-800">
                            {transaction.type === "retrait"
                              ? "Retrait"
                              : "Paiement"}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">
                            {transaction.description ||
                              "Aucune description disponible"}
                          </p>
                          <p className="text-xs text-gray-500 mt-2">
                            {formatDate(transaction.created_at)}
                          </p>
                        </div>
                        <span
                          className={`font-semibold ${
                            transaction.type === "retrait"
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
      </DialogContent>
    </Dialog>
  );
};

export default UserTransactionsModal;
