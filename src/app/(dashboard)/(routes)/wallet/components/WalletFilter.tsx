"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { SortOrder, WalletSortField } from "@/hooks/useWallets";
import { cn } from "@/lib/utils";
import { AlignCenter, ChevronsUpDown, Search } from "lucide-react";

interface WalletFilterProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sortField: WalletSortField;
  setSortField: (field: WalletSortField) => void;
  sortOrder: SortOrder;
  setSortOrder: (order: SortOrder) => void;
  refetch: () => void;
}

export function WalletFilter({
  searchQuery,
  setSearchQuery,
  sortField,
  setSortField,
  sortOrder,
  setSortOrder,
  refetch,
}: WalletFilterProps) {
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

  return (
    <div className="flex justify-between items-center mt-4">
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
      </div>
    </div>
  );
}
