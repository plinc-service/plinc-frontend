"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { SortOrder, TransactionSortField } from "@/hooks/useTransactions";
import { cn } from "@/lib/utils";
import { AlignCenter, Check, ChevronDown, ChevronsUpDown, Search } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";

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
  const handleDateSort = (order: SortOrder) => {
    // Mise à jour des états de tri
    setSortField("created_at");
    setSortOrder(order);
    
    // Force le refetch après la mise à jour de l'état
    setTimeout(() => {
      refetch();
    }, 10);
  };

  // Gestion du tri par montant
  const handleAmountSort = (order: SortOrder) => {
    // Mise à jour des états de tri
    setSortField("amount");
    setSortOrder(order);
    
    // Force le refetch après la mise à jour de l'état
    setTimeout(() => {
      refetch();
    }, 10);
  };

  // Gestion du tri par type
  const handleTypeSort = (order: SortOrder) => {
    // Mise à jour des états de tri
    setSortField("type");
    setSortOrder(order);
    
    // Force le refetch après la mise à jour de l'état
    setTimeout(() => {
      refetch();
    }, 10);
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
          {/* Menu déroulant pour le tri principal */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="h-10 px-4 flex items-center gap-2 border border-neutral-low rounded-full">
                <AlignCenter className="h-4 w-4" />
                <span>Trier par</span>
                <ChevronDown className="h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Options de tri</DropdownMenuLabel>
              <DropdownMenuSeparator />
              
              {/* Options de tri par date */}
              <DropdownMenuLabel className="font-normal text-xs text-muted-foreground px-2 py-1">Date</DropdownMenuLabel>
              <DropdownMenuItem 
                onClick={() => handleDateSort("asc")} 
                className={cn(
                  sortField === "created_at" && sortOrder === "asc" ? "bg-accent" : ""
                )}
              >
                <span>Du plus ancien au plus récent</span>
                {sortField === "created_at" && sortOrder === "asc" && (
                  <Check className="h-4 w-4 ml-auto" />
                )}
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => handleDateSort("desc")} 
                className={cn(
                  sortField === "created_at" && sortOrder === "desc" ? "bg-accent" : ""
                )}
              >
                <span>Du plus récent au plus ancien</span>
                {sortField === "created_at" && sortOrder === "desc" && (
                  <Check className="h-4 w-4 ml-auto" />
                )}
              </DropdownMenuItem>
              
              {/* Options de tri par montant */}
              <DropdownMenuSeparator />
              <DropdownMenuLabel className="font-normal text-xs text-muted-foreground px-2 py-1">Montant</DropdownMenuLabel>
              <DropdownMenuItem 
                onClick={() => handleAmountSort("asc")} 
                className={cn(
                  sortField === "amount" && sortOrder === "asc" ? "bg-accent" : ""
                )}
              >
                <span>Montant (croissant)</span>
                {sortField === "amount" && sortOrder === "asc" && (
                  <Check className="h-4 w-4 ml-auto" />
                )}
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => handleAmountSort("desc")} 
                className={cn(
                  sortField === "amount" && sortOrder === "desc" ? "bg-accent" : ""
                )}
              >
                <span>Montant (décroissant)</span>
                {sortField === "amount" && sortOrder === "desc" && (
                  <Check className="h-4 w-4 ml-auto" />
                )}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Menu déroulant spécifique pour le tri par type */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="h-10 px-4 flex items-center gap-2 border border-neutral-low rounded-full">
                <span>Type</span>
                <ChevronDown className="h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48">
              <DropdownMenuLabel>Tri par type de transaction</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={() => handleTypeSort("asc")} 
                className={cn(
                  sortField === "type" && sortOrder === "asc" ? "bg-accent" : ""
                )}
              >
                <span>Paiements puis retraits</span>
                {sortField === "type" && sortOrder === "asc" && (
                  <Check className="h-4 w-4 ml-auto" />
                )}
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => handleTypeSort("desc")} 
                className={cn(
                  sortField === "type" && sortOrder === "desc" ? "bg-accent" : ""
                )}
              >
                <span>Retraits puis paiements</span>
                {sortField === "type" && sortOrder === "desc" && (
                  <Check className="h-4 w-4 ml-auto" />
                )}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
