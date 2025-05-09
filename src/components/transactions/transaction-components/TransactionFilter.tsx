"use client";

import { Button } from "@/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/DropdownMenu";
import { AlignCenter, ChevronDown } from "lucide-react";

export interface TransactionFilterProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  refetch?: () => void;
  selectedFilter: string | null;
  setSelectedFilter: (filter: string | null) => void;
}

export function TransactionFilter({
  // searchQuery,
  setSearchQuery,
  selectedFilter,
  setSelectedFilter
}: TransactionFilterProps) {

  // const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setSearchQuery(e.target.value);
  // };

  const handleFilterChange = (filter: string | null) => {
    if (selectedFilter === filter) {
      setSelectedFilter(null);
    } else {
      setSelectedFilter(filter);
      setSearchQuery(filter || "");
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

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="h-10 px-4 flex items-center gap-2 border border-neutral-low rounded-full">
                <AlignCenter className="h-4 w-4" />
                <span>Trier par type</span>
                <ChevronDown className="h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-44">
              <DropdownMenuItem
                onClick={() => handleFilterChange("retrait")}
                className={`${selectedFilter === "retrait" ? "bg-primary/20" : ""}`}
              >
                Retrait
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleFilterChange("payment")}
                className={`${selectedFilter === "payment" ? "bg-primary/20" : ""}`}
              >
                Payment
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}