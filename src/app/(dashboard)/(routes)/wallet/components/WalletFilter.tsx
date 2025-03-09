"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { SortOrder, WalletSortField } from "@/hooks/useWallets";
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
        {/* Menu déroulant pour le tri */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="h-10 px-4 flex items-center gap-2 border border-neutral-low rounded-full">
              <AlignCenter className="h-4 w-4" />
              <span>Trier par montant</span>
              <ChevronDown className="h-4 w-4 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-44">
            <DropdownMenuLabel>Montant</DropdownMenuLabel>
            <DropdownMenuSeparator />
            
            {/* Options de tri par montant */}
            <DropdownMenuItem 
              onClick={() => handleAmountSort("asc")} 
              className={cn(
                sortField === "amount" && sortOrder === "asc" ? "bg-accent" : ""
              )}
            >
              <span>Croissant</span>
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
              <span>Décroissant</span>
              {sortField === "amount" && sortOrder === "desc" && (
                <Check className="h-4 w-4 ml-auto" />
              )}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
