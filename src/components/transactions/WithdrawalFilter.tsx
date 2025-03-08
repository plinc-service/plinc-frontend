"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { SortOrder } from "@/hooks/useTransactions";
import { Search } from "lucide-react";

interface WithdrawalFilterProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export function WithdrawalFilter({
  searchQuery,
  setSearchQuery,
}: WithdrawalFilterProps) {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="space-y-4">
      {/* Recherche */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-input-placeholder" />
        <Input 
          placeholder="Rechercher un retrait" 
          className="pl-9 h-10" 
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
    </div>
  );
}
