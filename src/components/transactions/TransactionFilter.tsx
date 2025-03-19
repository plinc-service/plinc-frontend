"use client";

import { Button } from "@/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/DropdownMenu";
import { Input } from "@/components/ui/Input";
import { cn } from "@/lib/utils";
import { Check, ChevronDown, Search } from "lucide-react";

export interface TransactionFilterProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  transactionType: string | null;
  setTransactionType: (type: string | null) => void;
  refetch?: () => void;
}

export function TransactionFilter({
  searchQuery,
  setSearchQuery,
  transactionType,
  setTransactionType,
  refetch
}: TransactionFilterProps) {

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

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
      <div className="flex items-center justify-between gap-4">
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
          {/* Menu de filtre par type */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="h-10 px-4 flex items-center gap-2 border border-neutral-low rounded-full">
                <span>Type de transaction</span>
                <ChevronDown className="h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44">
              <DropdownMenuItem 
                onClick={() => handleTypeChange("payment")} 
                className={cn(transactionType === "payment" ? "bg-accent" : "")}
              >
                <span>Payment</span>
                {transactionType === "payment" && <Check className="h-4 w-4 ml-auto" />}
              </DropdownMenuItem>
              
              <DropdownMenuItem 
                onClick={() => handleTypeChange("retrait")} 
                className={cn(transactionType === "retrait" ? "bg-accent" : "")}
              >
                <span>Retrait</span>
                {transactionType === "retrait" && <Check className="h-4 w-4 ml-auto" />}
              </DropdownMenuItem>
              
              <DropdownMenuItem 
                onClick={() => handleTypeChange("depot")} 
                className={cn(transactionType === "depot" ? "bg-accent" : "")}
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
