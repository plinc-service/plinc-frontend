"use client";

import { Button } from "@/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { Input } from "@/components/ui/Input";
import { SortOrder, WalletSortField } from "@/hooks/useWallets";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp, Search } from "lucide-react";

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

  const handleSort = (field: WalletSortField) => {
    if (sortField === field) {
      const newOrder: SortOrder = sortOrder === "asc" ? "desc" : "asc";
      setSortOrder(newOrder);
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
    refetch();
  };

  const getSortIcon = (field: WalletSortField) => {
    if (sortField !== field) return null;
    return sortOrder === "asc" ? (
      <ChevronUp className="h-4 w-4 ml-auto" />
    ) : (
      <ChevronDown className="h-4 w-4 ml-auto" />
    );
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="h-10 px-4 flex items-center gap-2 border border-neutral-low rounded-full">
              <span>Trier par</span>
              <ChevronDown className="h-4 w-4 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem
              onClick={() => handleSort("amount")}
              className={cn(
                sortField === "amount" ? "bg-primary/20 font-medium text-primary" : ""
              )}
            >
              <span>Solde</span>
              {getSortIcon("amount")}
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => handleSort("created_at")}
              className={cn(
                sortField === "created_at" ? "bg-primary/20 font-medium text-primary" : ""
              )}
            >
              <span>Date de création</span>
              {getSortIcon("created_at")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
