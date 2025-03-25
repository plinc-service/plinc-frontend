"use client";

import { Button } from "@/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/DropdownMenu";
import { ChevronDown } from "lucide-react";

export interface TransactionFilterProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  transactionType: string | null;
  setTransactionType: (type: string | null) => void;
  refetch?: () => void;
}

export function TransactionFilter({
  // searchQuery,
  setSearchQuery,
  transactionType,
  setTransactionType,
  refetch
}: TransactionFilterProps) {

  // const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setSearchQuery(e.target.value);
  // };

  const handleTypeChange = (type: string | null) => {
    if (transactionType === type) {
      setTransactionType(null);
    } else {
      setTransactionType(type);
    }

    if (refetch) {
      refetch();
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-end gap-4">
        {/* <div className="relative flex-1 max-w-[610px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-input-placeholder" />
          <Input
            placeholder="Rechercher"
            className="pl-9 h-10"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div> */}
        <div className="flex items-center gap-2">
          {/* Menu de filtre par type */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="h-10 px-4 flex items-center gap-2 border border-neutral-low rounded-full">
                <span>Type de transaction</span>
                <ChevronDown className="h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-44">
              <DropdownMenuItem
                onClick={() => handleFilterChange("retrait")}
                className={`${selectedFilter === "retrait" ? "bg-primary/20" : ""}`}
              >
                <span>Retrait</span>
                {transactionType === "retrait" && <Check className="h-4 w-4 ml-auto" />}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleFilterChange("payment")}
                className={`${selectedFilter === "payment" ? "bg-primary/20" : ""}`}
              >
                <span>Dépôt</span>
                {transactionType === "depot" && <Check className="h-4 w-4 ml-auto" />}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
