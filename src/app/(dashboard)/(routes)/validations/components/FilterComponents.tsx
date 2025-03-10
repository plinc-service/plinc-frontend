"use client";

import { Button } from "@/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuTrigger
} from "@/components/ui/DropdownMenu";
import { ChevronDown } from "lucide-react";

interface WithdrawalFilterProps {
  refetch: () => void;
}

export function WithdrawalFilter({
  refetch,
}: WithdrawalFilterProps) {

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
        {/* <DropdownMenuContent align="end" className="w-44">
          <DropdownMenuLabel>Date d&apos;inscription</DropdownMenuLabel>
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
        </DropdownMenuContent> */}
      </DropdownMenu>
    </div>
  );
}

interface ServiceFilterProps {
  refetch: () => void;
}

export function ServiceFilter({
  refetch,
}: ServiceFilterProps) {

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
        {/* <DropdownMenuContent align="end" className="w-44">
          <DropdownMenuLabel>Date d&apos;inscription</DropdownMenuLabel>
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
        </DropdownMenuContent> */}
      </DropdownMenu>
    </div>
  );
}