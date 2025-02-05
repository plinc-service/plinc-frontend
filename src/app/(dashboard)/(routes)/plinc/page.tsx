"use client";

import React from "react";
import { DataTable } from "@/components/users/data-table";
import { Search, AlignCenter, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { columns, type Plinc } from "./columns";
import { cn } from "@/lib/utils";

const mockData: Plinc[] = [
  {
    id: "00001",
    provider: {
      name: "John DOE",
      image: "/avatar.svg",
    },
    client: {
      name: "John DOE",
      image: "/avatar.svg",
    },
    category: "Ménage",
    date: "12-09-2024",
    status: "En attente",
    amount: "100€",
  },
  {
    id: "00002",
    provider: {
      name: "Jane SMITH",
      image: "/avatar.svg",
    },
    client: {
      name: "Jane SMITH",
      image: "/avatar.svg",
    },
    category: "Babysitting",
    date: "12-09-2024",
    status: "Accepter",
    amount: "150€",
  },
  {
    id: "00003",
    provider: {
      name: "Alice JOHNSON",
      image: "/avatar.svg",
    },
    client: {
      name: "Alice JOHNSON",
      image: "/avatar.svg",
    },
    category: "Electricité",
    date: "12-09-2024",
    status: "Annuler",
    amount: "80€",
  },
  // ... autres données mockées
];

const filters = [
  { label: "Tout", value: "all" },
  { label: "En attente", value: "en-attente" },
  { label: "Accepter", value: "accepter" },
  { label: "Confirmer", value: "confirmer" },
  { label: "En cours", value: "en-cours" },
  { label: "Terminer", value: "terminer" },
];

type SortConfig = {
  key: keyof Plinc | "";
  direction: "asc" | "desc";
};

export default function PlinCPage() {
  const [activeFilter, setActiveFilter] = React.useState("all");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [sortConfig, setSortConfig] = React.useState<SortConfig>({ key: "", direction: "asc" });
  const [showSortMenu, setShowSortMenu] = React.useState(false);

  const sortOptions = [
    { label: "Date", value: "date" },
    { label: "Montant", value: "amount" },
    { label: "Statut", value: "status" },
  ];

  const filteredData = React.useMemo(() => {
    let result = [...mockData];

    if (activeFilter !== "all") {
      const statusMap: Record<string, string> = {
        "en-attente": "En attente",
        "accepter": "Accepter",
        "confirmer": "Confirmé",
        "en-cours": "En cours",
        "terminer": "Terminer"
      };
      result = result.filter(item => item.status === statusMap[activeFilter]);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(item =>
        item.id.toLowerCase().includes(query) ||
        item.provider.name.toLowerCase().includes(query) ||
        item.client.name.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query)
      );
    }

    // Tri
    if (sortConfig.key) {
      result.sort((a, b) => {
        let aValue: any = a[sortConfig.key as keyof Plinc];
        let bValue: any = b[sortConfig.key as keyof Plinc];

        if (sortConfig.key === "provider") {
          aValue = (aValue as any).name;
          bValue = (bValue as any).name;
        } else if (sortConfig.key === "client") {
          aValue = (aValue as any).name;
          bValue = (bValue as any).name;
        } else if (sortConfig.key === "amount") {
          aValue = parseFloat((aValue as string).replace("€", ""));
          bValue = parseFloat((bValue as string).replace("€", ""));
        }

        if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [mockData, activeFilter, searchQuery, sortConfig]);

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">PlinC</h2>
      </div>

      <div className="space-y-4">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            {filters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-full border",
                  activeFilter === filter.value
                    ? "text-blue border-neutral-lower bg-blue text-white"
                    : "text-neutral-medium hover:text-neutral-high border-lower transition-colors"
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
                <span>Trier par {sortConfig.key && sortOptions.find(opt => opt.value === sortConfig.key)?.label}</span>
                <ChevronDown className="h-4 w-4 text-neutral-high" />
              </Button>

              {showSortMenu && (
                <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-lg border border-neutral-100 z-10">
                  {sortOptions.map((option) => (
                    <button
                      key={option.value}
                      className="w-full px-4 py-2 text-left text-sm hover:bg-neutral-50 flex items-center justify-between"
                      onClick={() => {
                        setSortConfig(prev => ({
                          key: option.value as keyof Plinc,
                          direction: prev.key === option.value ? (prev.direction === "asc" ? "desc" : "asc") : "asc"
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

        <DataTable columns={columns} data={filteredData} />
      </div>
    </div>
  );
}
