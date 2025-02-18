"use client";

import React from "react";
import { useRouter, useParams } from "next/navigation";
import { DataTable } from "@/components/users/data-table";
import { columns } from "./columns";
import { Search, AlignCenter, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { plincService } from "@/services/PlincService";
import type { Plinc } from "@/interfaces/plincInterface";

interface PlincsTableProps {
  isClient: boolean;
}

const UserPlincs = ({ isClient = true }: PlincsTableProps) => {
  const router = useRouter();
  const params = useParams();
  const userId = params.userId as string;

  const [searchQuery, setSearchQuery] = React.useState("");
  const [plincs, setPlincs] = React.useState<Plinc[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);

  React.useEffect(() => {
    const fetchPlincs = async () => {
      try {
        setLoading(true);
        const response = await plincService.getUserPlincs(
          userId,
          currentPage,
          10, // pageSize par défaut
          'created_at',
          'desc',
          searchQuery,
          undefined,
          isClient
        );
        setPlincs(response.data);
        setTotalPages(response.total_pages);
      } catch (error) {
        console.error("Error fetching plincs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlincs();
  }, [userId, currentPage, isClient, searchQuery]);

  const filteredPlincs = React.useMemo(() => {
    if (!searchQuery) return plincs;
    return plincs.filter(
      (plinc) =>
        plinc.service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        plinc.customer.username.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [plincs, searchQuery]);

  return (
    <div className="rounded-2xl p-2">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-8">
          <button
          onClick={() => router.push(`/users/${userId}/plincs`)}
            className={`px-4 py-2 text-base font-medium cursor-pointer ${
              isClient
                ? "text-blue border-b-2 border-blue after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue"
                : "text-neutral-medium hover:text-neutral-high transition-colors"
            }`}
          >
            Achetés
          </button>
          <button
            onClick={() => router.push("plincs/vendus")}
            className={`px-4 py-2 text-base font-medium cursor-pointer ${
              !isClient
                ? "text-blue border-b-2 border-blue after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue"
                : "text-neutral-medium hover:text-neutral-high transition-colors"
            }`}
          >
            Vendus
          </button>
        </div>
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
          <Button
            variant="outline"
            className="h-10 px-4 flex items-center gap-2 border border-neutral-low rounded-full"
          >
            <AlignCenter className="h-4 w-4" />
            <span>Trier par</span>
            <ChevronDown className="h-4 w-4 text-neutral-high" />
          </Button>
        </div>
      </div>
      <DataTable
        columns={columns}
        data={filteredPlincs}
        loading={loading}
        pagination={{
          currentPage,
          totalPages,
          onPageChange: setCurrentPage,
        }}
      />
    </div>
  );
};

export default UserPlincs;
