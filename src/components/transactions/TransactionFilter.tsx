"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { SortOrder, TransactionSortField } from "@/hooks/useTransactions";
import { cn } from "@/lib/utils";
import { AlignCenter, ChevronsUpDown, Search } from "lucide-react";

interface TransactionFilterProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sortField: TransactionSortField;
  setSortField: (field: TransactionSortField) => void;
  sortOrder: SortOrder;
  setSortOrder: (order: SortOrder) => void;
  transactionType: string | undefined;
  setTransactionType: (type: string | undefined) => void;
  refetch: () => void;
}

export function TransactionFilter({
  searchQuery,
  setSearchQuery,
  sortField,
  setSortField,
  sortOrder,
  setSortOrder,
  transactionType,
  setTransactionType,
  refetch,
}: TransactionFilterProps) {
  const transactionTypeOptions = [
    { label: "Tout", value: undefined },
    { label: "Paiements", value: "paiement" },
    { label: "Retraits", value: "retrait" },
    { label: "Retraits en attente", value: "retrait-en-attente" },
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Gestion du tri par date
  const handleDateSort = () => {
    // Si on trie déjà par date, on inverse l'ordre
    if (sortField === "created_at") {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      // Sinon, on change le champ de tri pour date
      setSortField("created_at");
      setSortOrder("desc");
    }
    refetch();
  };

  // Gestion du tri par montant
  const handleAmountSort = () => {
    // Si on trie déjà par montant, on inverse l'ordre
    if (sortField === "amount") {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      // Sinon, on change le champ de tri pour montant
      setSortField("amount");
      setSortOrder("desc");
    }
    refetch();
  };

  // Gestion du tri par type
  const handleTypeSort = () => {
    // Si on trie déjà par type, on inverse l'ordre
    if (sortField === "type") {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      // Sinon, on change le champ de tri pour type
      setSortField("type");
      setSortOrder("desc");
    }
    refetch();
  };

  // Gestion du changement de type de transaction
  const handleTransactionTypeClick = (type: string | undefined) => {
    const newType = transactionType === type ? undefined : type;
    setTransactionType(newType);
    refetch();
  };

  return (
    <div className="space-y-4">
      {/* Filtres par type de transaction */}
      <div className="flex items-center gap-2">
        {transactionTypeOptions.map((option, index) => {
          const isActive = transactionType === option.value || 
            (option.value === undefined && transactionType === undefined);

          return (
            <Button
              key={index}
              size="sm"
              variant={isActive ? "default" : "outline"}
              onClick={() => handleTransactionTypeClick(option.value)}
            >
              {option.label}
            </Button>
          );
        })}
      </div>

      {/* Recherche et tri */}
      <div className="flex items-center justify-between">
        <div className="relative flex-1 max-w-[610px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-input-placeholder" />
          <Input 
            placeholder="Rechercher" 
            className="pl-9 h-10" 
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <div className="flex items-center gap-2">
          {/* Bouton Trier par Date */}
          <Button
            variant="outline"
            className={cn(
              "h-10 px-4 flex items-center gap-2 border border-neutral-low rounded-full",
              sortField === "created_at" && "border-blue"
            )}
            onClick={handleDateSort}
          >
            <AlignCenter className="h-4 w-4" />
            <span className={cn(sortField === "created_at" && "text-blue")}>Trier par Date</span>
            {sortField === "created_at" && (
              <span className="ml-1 text-blue">
                {sortOrder === "asc" ? "↑" : "↓"}
              </span>
            )}
          </Button>

          {/* Bouton Montant avec indication d'ordre ascendant/descendant */}
          <Button
            variant="outline"
            className={cn(
              "h-10 px-4 flex items-center gap-2 border border-neutral-low rounded-full",
              sortField === "amount" && "border-blue"
            )}
            onClick={handleAmountSort}
          >
            <span className={cn(sortField === "amount" && "text-blue")}>
              Montant {sortField === "amount" && (sortOrder === "asc" ? "(Croissant)" : "(Décroissant)")}
            </span>
            <ChevronsUpDown className={cn("h-4 w-4", sortField === "amount" && "text-blue")} />
          </Button>

          {/* Bouton Type avec indication d'ordre ascendant/descendant */}
          <Button
            variant="outline"
            className={cn(
              "h-10 px-4 flex items-center gap-2 border border-neutral-low rounded-full",
              sortField === "type" && "border-blue"
            )}
            onClick={handleTypeSort}
          >
            <span className={cn(sortField === "type" && "text-blue")}>
              Type {sortField === "type" && (sortOrder === "asc" ? "(A-Z)" : "(Z-A)")}
            </span>
            <ChevronsUpDown className={cn("h-4 w-4", sortField === "type" && "text-blue")} />
          </Button>
        </div>
      </div>
    </div>
  );
}
