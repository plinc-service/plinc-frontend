"use client";

import React from "react";
import { useParams } from "next/navigation";
import { DataTable } from "@/components/users/data-table";
import { columns } from "./columns";
import { Search, AlignCenter, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { plincService } from "@/services/PlincService";
import type { Plinc } from "@/interfaces/plincInterface";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs";

type SortConfig = {
  key: "service.name" | "customer.username" | "created_at" | "";
  direction: "asc" | "desc";
};

const UserPlincs = () => {
  const params = useParams();
  const userId = params.userId as string;

  // États
  const [searchQuery, setSearchQuery] = React.useState("");
  const [allPlincs, setAllPlincs] = React.useState<Plinc[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);
  const [activeTab, setActiveTab] = React.useState("achetes");
  const [sortConfig, setSortConfig] = React.useState<SortConfig>({
    key: "created_at",
    direction: "desc",
  });
  const [showSortMenu, setShowSortMenu] = React.useState(false);

  const sortOptions = [
    { label: "Nom du service", value: "service.name" },
    { label: "Nom d'utilisateur", value: "customer.username" },
    { label: "Date de création", value: "created_at" },
  ];

  // Fonction pour charger les données
  const fetchPlincs = React.useCallback(async () => {
    try {
      setLoading(true);
      const response = await plincService.getUserPlincs(
        userId,
        currentPage,
        10, // Augmenter la limite pour avoir plus de données à filtrer localement
        undefined,
        undefined,
        "", // Pas de filtre de recherche côté serveur
        undefined,
        activeTab === "achetes"
      );
      setAllPlincs(response.data);
      setTotalPages(response.total_pages);
    } catch (error) {
      console.error("Error fetching plincs:", error);
    } finally {
      setLoading(false);
    }
  }, [userId, currentPage, activeTab]);

  // Charger les données initiales
  React.useEffect(() => {
    fetchPlincs();
  }, [fetchPlincs]);

  // Filtrage et tri des données
  const filteredAndSortedPlincs = React.useMemo(() => {
    if (!allPlincs) return [];

    let result = [...allPlincs];

    // Filtrage par recherche
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(
        (plinc) =>
          String(plinc.id).toLowerCase().includes(query) ||
          plinc.service.owner.username.toLowerCase().includes(query) ||
          plinc.service.name.toLowerCase().includes(query)
      );
    }

    // Tri
    if (sortConfig.key) {
      result.sort((a, b) => {
        let aValue: string | number;
        let bValue: string | number;

        switch (sortConfig.key) {
          case "service.name":
            aValue = a.service.name;
            bValue = b.service.name;
            break;
          case "customer.username":
            aValue = a.customer.username;
            bValue = b.customer.username;
            break;
          case "created_at":
            aValue = new Date(a.created_at).getTime();
            bValue = new Date(b.created_at).getTime();
            return sortConfig.direction === "asc"
              ? aValue - bValue
              : bValue - aValue;
          default:
            return 0;
        }

        const aString = String(aValue).toLowerCase();
        const bString = String(bValue).toLowerCase();
        return sortConfig.direction === "asc"
          ? aString.localeCompare(bString)
          : bString.localeCompare(aString);
      });
    }

    return result;
  }, [allPlincs, searchQuery, sortConfig]);

  return (
    <div className="rounded-2xl p-2">
      <Tabs
        defaultValue="achetes"
        value={activeTab}
        onValueChange={(newValue) => {
          setActiveTab(newValue);
          setSearchQuery("");
        }}
        className="w-full"
      >
        <div className="flex items-center justify-between mb-6">
          <TabsList>
            <TabsTrigger value="achetes">Achetés</TabsTrigger>
            <TabsTrigger value="vendus">Vendus</TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-2">
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
                <span>Trier par</span>
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

        <TabsContent value="achetes">
          <DataTable
            columns={columns}
            data={filteredAndSortedPlincs}
            loading={loading}
            pagination={{
              currentPage,
              totalPages,
              onPageChange: setCurrentPage,
            }}
          />
        </TabsContent>
        <TabsContent value="vendus">
          <DataTable
            columns={columns}
            data={filteredAndSortedPlincs}
            loading={loading}
            pagination={{
              currentPage,
              totalPages,
              onPageChange: setCurrentPage,
            }}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserPlincs;
