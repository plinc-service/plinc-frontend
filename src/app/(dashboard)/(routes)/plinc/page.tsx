"use client";

import React from "react";
import PlinCSkeleton from "./components/PlinCSkeleton";
import { PlincTable } from "./components/plinc-table";
import { Search, AlignCenter, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { columns, enhanceColumnsWithRowClick, getStatusLabel } from "./columns";
import { PlincDetailsModal } from "./components/PlincDetailsModal";
import TopBar from "@/components/layout/TopBar";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { plincService } from "@/services/PlincService";

const filters = [
  { label: "Tout", value: "all" },
  { label: "En attente", value: "en-attente" },
  { label: "Accepter", value: "accepte" },
  { label: "Confirmer", value: "confirme" },
  { label: "En cours", value: "en-cours" },
  { label: "Terminer", value: "termine" },
  { label: "Annuler", value: "annule" },
  { label: "Rejeter", value: "rejete" },
];

const getStatusNumber = (filterValue: string): number => {
  switch (filterValue) {
    case "en-attente": return 0;
    case "accepte": return 1;
    case "rejete": return 2;
    case "confirme": return 3;
    case "annule": return 4;
    case "en-cours": return 5;
    case "livre": return 6;
    case "litige": return 7;
    case "termine": return 8;
    default: return -1;
  }
};


type SortConfig = {
  key: "date" | "status" | "serviceName" | "";
  direction: "asc" | "desc";
};

export default function PlinCPage() {
  const [mounted, setMounted] = React.useState(false);
  const [activeFilter, setActiveFilter] = React.useState("all");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [sortConfig, setSortConfig] = React.useState<SortConfig>({
    key: "",
    direction: "asc",
  });
  const [showSortMenu, setShowSortMenu] = React.useState(false);
  const [selectedPlincId, setSelectedPlincId] = React.useState<string>();
  const [status, setStatus] = React.useState<number>()
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const currentPage = 1;

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const { data: plincsData, isLoading } = useQuery({
    queryKey: ["plincs", activeFilter, currentPage],
    queryFn: () => plincService.getAllPlincs(Number(currentPage), 10, undefined, 'desc', searchQuery, getStatusNumber(activeFilter)),
    enabled: mounted,
  });

  const handleRowClick = (id: number) => {
    const plinc = filteredData.find(item => item.id === id);
    if (plinc) {
      setStatus(Number(plinc.status));
      setSelectedPlincId(String(id)); // Assurez-vous que l'ID est converti en chaîne
      setIsModalOpen(true);
    }
  };

  const sortOptions = [
    { label: "Date", value: "date" },
    { label: "Service", value: "serviceName" },
    { label: "Statut", value: "status" },
  ];

  const filteredData = React.useMemo(() => {
    if (!plincsData?.data) return [];

    let result = [...plincsData.data];
    console.log(result)


    // Filtrage par statut
    if (activeFilter !== "all") {
      result = result.filter(plinc => plinc.status === getStatusNumber(activeFilter));
    }

    // Filtrage par recherche si nécessaire
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (item) =>
          String(item.id).toLowerCase().includes(query) ||
          item.service.owner.username.toLowerCase().includes(query) ||
          item.service.name.toLowerCase().includes(query)
      );
    }

    // Tri
    if (sortConfig.key) {
      result.sort((a, b) => {
        if (sortConfig.key === "date") {
          const aDate = new Date(a.date).getTime();
          const bDate = new Date(b.date).getTime();
          return sortConfig.direction === "asc" ? aDate - bDate : bDate - aDate;
        }

        if (sortConfig.key === "serviceName") {
          const aName = a.service.name.toLowerCase();
          const bName = b.service.name.toLowerCase();
          return sortConfig.direction === "asc"
            ? aName.localeCompare(bName)
            : bName.localeCompare(aName);
        }

        if (sortConfig.key === "status") {
          const aStatus = getStatusLabel(a.status);
          const bStatus = getStatusLabel(b.status);
          return sortConfig.direction === "asc"
            ? aStatus.localeCompare(bStatus)
            : bStatus.localeCompare(aStatus);
        }

        return 0;
      });
    }

    return result;
  }, [plincsData, searchQuery, sortConfig, activeFilter]);

  return (
    <div className="flex-1 space-y-4 p-3 mx-2">
      <TopBar pageName="PlinC" />

      <div className="space-y-4">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {filters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap",
                  activeFilter === filter.value
                    ? "bg-blue text-white border-none"
                    : "bg-white text-[#6B7280] hover:bg-gray-50 border border-[#E5E7EB] transition-colors"
                )}
              >
                {filter.label}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-end gap-2">
            <div className="relative w-[280px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-high" />
              <Input
                placeholder="Rechercher"
                className="pl-9 h-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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
                  {sortConfig.key &&
                    sortOptions.find((opt) => opt.value === sortConfig.key)
                      ?.label}
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
                        setSortConfig((prev) => ({
                          key: option.value as SortConfig["key"],
                          direction:
                            prev.key === option.value
                              ? prev.direction === "asc"
                                ? "desc"
                                : "asc"
                              : "asc",
                        }));
                        setShowSortMenu(false);
                      }}
                    >
                      {option.label}
                      {sortConfig.key === option.value && (
                        <span className="text-blue">
                          {sortConfig.direction === "asc" ? "↑" : "↓"}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {isLoading ? (
          <PlinCSkeleton />
        ) : (
          <PlincTable
            columns={enhanceColumnsWithRowClick(
              columns(),
              handleRowClick
            )}
            data={filteredData}
          />
        )}

        <PlincDetailsModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          plincId={selectedPlincId}
          status={status}
        />
      </div>
    </div>
  );
}
