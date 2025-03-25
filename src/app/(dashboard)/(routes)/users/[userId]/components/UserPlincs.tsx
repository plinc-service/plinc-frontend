"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { DataTable } from "@/components/users/data-table";
import type { Plinc } from "@/interfaces/plincInterface";
import { plincService } from "@/services/PlincService";
import { AlignCenter, ChevronDown, Search } from "lucide-react";
import { useParams } from "next/navigation";
import React from "react";
import { columns } from "./columns";

type SortConfig = {
  key: "created_at" | "service.hour_price" | "";
  direction: "asc" | "desc";
};

const UserPlincs = () => {
  const params = useParams();
  const userId = params.userId as string;


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
    { label: "Date", value: "created_at" },
    { label: "Montant", value: "service.hour_price" },
  ];


  const fetchPlincs = React.useCallback(async () => {
    try {
      setLoading(true);
      const response = await plincService.getUserPlincs(
        userId,
        currentPage,
        10,
        sortConfig.key,
        sortConfig.direction,
        searchQuery.trim(),
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
  }, [userId, currentPage, activeTab, sortConfig.key, sortConfig.direction, searchQuery]);

  React.useEffect(() => {
    fetchPlincs();
  }, [fetchPlincs]);
  const filteredAndSortedPlincs = React.useMemo(() => {
    if (!allPlincs) return [];
    return allPlincs;
  }, [allPlincs]);

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
            <TabsTrigger value="achetes" className="cursor-pointer">Achetés</TabsTrigger>
            <TabsTrigger value="vendus" className="cursor-pointer">Vendus</TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-2">
            <div className="relative w-[280px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-high" />
              <Input
                placeholder="Rechercher"
                className="pl-9 h-10"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
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
                        setCurrentPage(1);
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
