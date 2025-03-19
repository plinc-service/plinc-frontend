"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { usePlincsRequests, PlincFilterStatus } from "@/hooks/usePlincsRequests";
import { cn } from "@/lib/utils";
import { AlignCenter, ChevronDown, Search } from "lucide-react";
import React, { useState } from "react";
import { columns, enhanceColumnsWithRowClick } from "../columns";
import { PlincDetailsModal } from "./PlincDetailsModal";
import { PlincTable } from "./plinc-table";
import PlincTablePagination from "./PlincTablePagination";

const filters: { label: string; value: PlincFilterStatus }[] = [
  { label: "Tout", value: "all" },
  { label: "En attente", value: "en-attente" },
  { label: "Accepter", value: "accepte" },
  { label: "Confirmer", value: "confirme" },
  { label: "En cours", value: "en-cours" },
  { label: "Terminer", value: "termine" },
  { label: "Annuler", value: "annule" },
  { label: "Rejeter", value: "rejete" },
];

const sortOptions = [
  { label: "Date", value: "date" },
  { label: "Service", value: "serviceName" },
  { label: "Statut", value: "status" },
];

const PlincsTableWrapper = () => {
  const [selectedPlincId, setSelectedPlincId] = useState<string>();
  const [status, setStatus] = useState<number>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSortMenu, setShowSortMenu] = useState(false);

  const {
    data: plincs,
    loading,
    error,
    searchQuery,
    setSearchQuery: handleSearchChange,
    selectedStatus,
    setSelectedStatus: handleStatusChange,
    sortField,
    sortOrder,
    handleSort,
    page,
    totalPages,
    goToNextPage,
    goToPreviousPage,
    goToPage,
  } = usePlincsRequests();



  const handleRowClick = (id: number) => {
    const plinc = plincs.find(item => item.id === id);
    if (plinc) {
      setStatus(Number(plinc.status));
      setSelectedPlincId(String(id));
      setIsModalOpen(true);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4">
        {/* Filtres par statut */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {filters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => {
                handleStatusChange(filter.value);
              }}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap",
                selectedStatus === filter.value
                  ? "bg-blue text-white border-none"
                  : "bg-white text-[#6B7280] hover:bg-gray-50 border border-[#E5E7EB] transition-colors"
              )}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Recherche et tri */}
        <div className="flex items-center justify-end gap-2">
          <div className="relative w-[280px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-high" />
            <Input
              placeholder="Rechercher"
              className="pl-9 h-10"
              value={searchQuery}
              onChange={(e) => {
                handleSearchChange(e.target.value);
              }}
            />
          </div>
          <div className="relative">
            <Button
              variant="outline"
              className="h-10 px-4 flex items-center gap-2 border border-neutral-low rounded-full"
              onClick={() => setShowSortMenu(!showSortMenu)}
            >
              <AlignCenter className="h-4 w-4" />
              <span>
                Trier par{" "}
                {sortField &&
                  sortOptions.find((opt) => opt.value === sortField)?.label}
              </span>
              <ChevronDown className="h-4 w-4 text-neutral-high" />
            </Button>

            {showSortMenu && (
              <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-lg border border-neutral-100 z-10">
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    className="w-full px-4 py-2 text-left text-sm hover:bg-neutral-50 flex items-center justify-between"
                    onClick={() => {
                      handleSort(option.value as "date" | "serviceName" | "status");
                      setShowSortMenu(false);
                    }}
                  >
                    {option.label}
                    {sortField === option.value && (
                      <span className="text-blue">
                        {sortOrder === "asc" ? "↑" : "↓"}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Table des Plincs */}
      <PlincTable
        columns={enhanceColumnsWithRowClick(columns(), handleRowClick)}
        data={plincs}
        loading={loading}
        error={error}
      />
      <PlincTablePagination
        page={page}
        totalPages={totalPages}
        onNextPage={goToNextPage}
        onPreviousPage={goToPreviousPage}
        onPageChange={goToPage}
        data={plincs}
      />

      {/* Modal de détails */}
      <PlincDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        plincId={selectedPlincId}
        status={status}
      />
    </div>
  );
};

export default PlincsTableWrapper;
