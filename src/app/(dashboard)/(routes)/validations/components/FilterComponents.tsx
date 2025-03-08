"use client";

import { Button } from "@/components/ui/Button";
import { SortOrder, TransactionSortField } from "@/hooks/useTransactions";
import { SortField } from "@/hooks/useValidations";
import { cn } from "@/lib/utils";
import { ChevronDown, Check } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from "@/components/ui/DropdownMenu";

interface WithdrawalFilterProps {
  sortField: TransactionSortField;
  setSortField: (field: TransactionSortField) => void;
  sortOrder: SortOrder;
  setSortOrder: (order: SortOrder) => void;
  refetch: () => void;
}

export function WithdrawalFilter({
  sortField,
  setSortField,
  sortOrder,
  setSortOrder,
  refetch,
}: WithdrawalFilterProps) {
  // Gestion du tri par date
  const handleDateSort = (order: SortOrder) => {
    // Mise à jour des états de tri
    setSortField("created_at");
    setSortOrder(order);
    
    // Force le refetch après la mise à jour de l'état
    setTimeout(() => {
      console.log("WithdrawalFilter - Applying sort:", { 
        sortField: "created_at", 
        sortOrder: order 
      });
      refetch();
    }, 10);
  };

  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            className="h-10 px-4 flex items-center gap-2 border border-neutral-low rounded-full"
          >
            <span>Trier par</span>
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-44">
          <DropdownMenuLabel>Date d'inscription</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem 
            onClick={() => handleDateSort("asc")} 
            className={cn("flex items-center justify-between", 
              sortField === "created_at" && sortOrder === "asc" ? "bg-blue/10" : "")}
          >
            <span>Du plus ancien au plus récent</span>
            {sortField === "created_at" && sortOrder === "asc" && (
              <Check className="h-4 w-4 ml-2 text-blue" />
            )}
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => handleDateSort("desc")} 
            className={cn("flex items-center justify-between", 
              sortField === "created_at" && sortOrder === "desc" ? "bg-blue/10" : "")}
          >
            <span>Du plus récent au plus ancien</span>
            {sortField === "created_at" && sortOrder === "desc" && (
              <Check className="h-4 w-4 ml-2 text-blue" />
            )}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

interface ServiceFilterProps {
  sortField: SortField;
  setSortField: (field: SortField) => void;
  sortOrder: SortOrder;
  setSortOrder: (order: SortOrder) => void;
  refetch: () => void;
}

export function ServiceFilter({
  sortField,
  setSortField,
  sortOrder,
  setSortOrder,
  refetch,
}: ServiceFilterProps) {
  // Gestion du tri par date
  const handleDateSort = (order: SortOrder) => {
    // Mise à jour des états de tri
    setSortField("created_at");
    setSortOrder(order);
    
    // Force le refetch après la mise à jour de l'état
    setTimeout(() => {
      console.log("ServiceFilter - Applying sort:", { 
        sortField: "created_at", 
        sortOrder: order 
      });
      refetch();
    }, 10);
  };

  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            className="h-10 px-4 flex items-center gap-2 border border-neutral-low rounded-full"
          >
            <span>Trier par</span>
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-44">
          <DropdownMenuLabel>Date d'inscription</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem 
            onClick={() => handleDateSort("asc")} 
            className={cn("flex items-center justify-between", 
              sortField === "created_at" && sortOrder === "asc" ? "bg-blue/10" : "")}
          >
            <span>Du plus ancien au plus récent</span>
            {sortField === "created_at" && sortOrder === "asc" && (
              <Check className="h-4 w-4 ml-2 text-blue" />
            )}
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => handleDateSort("desc")} 
            className={cn("flex items-center justify-between", 
              sortField === "created_at" && sortOrder === "desc" ? "bg-blue/10" : "")}
          >
            <span>Du plus récent au plus ancien</span>
            {sortField === "created_at" && sortOrder === "desc" && (
              <Check className="h-4 w-4 ml-2 text-blue" />
            )}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}