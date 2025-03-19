"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { SortOrder, WalletSortField } from "@/hooks/useWallets";
import { cn } from "@/lib/utils";
import { Check, ChevronDown, Search } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
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

  const handleAmountSort = (order: SortOrder) => {
    setSortField("amount");
    setSortOrder(order);
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
        {/* Menu déroulant pour le tri */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="h-10 px-4 flex items-center gap-2 border border-neutral-low rounded-full">
              <span>Trier par</span>
              <ChevronDown className="h-4 w-4 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-44">
            <DropdownMenuItem 
              onClick={() => handleAmountSort("asc")} 
              className={cn(
                sortField === "amount" && sortOrder === "asc" ? "bg-accent" : ""
              )}
            >
              <span>Solde</span>
              {sortField === "amount" && sortOrder === "asc" && (
                <Check className="h-4 w-4 ml-auto" />
              )}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
