"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { DataTable } from "@/components/users/data-table";
import { Search, AlignCenter, ChevronDown } from "lucide-react";
import { columns } from "./columns";
import { Plinc } from "@/interfaces/plincInterface";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { plincService } from "@/services/PlincService";

interface UserPlincsVendusProps {
  userId: string;
}

const UserPlincsVendus = ({ userId }: UserPlincsVendusProps) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [plincs, setPlincs] = React.useState<Plinc[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);
  const PAGE_SIZE = 10;

  React.useEffect(() => {
    const fetchPlincs = async () => {
      try {
        const response = await plincService.getUserPlincs(
          userId,
          currentPage,
          PAGE_SIZE,
          'created_at',  // tri par date de création
          'desc',        // ordre décroissant
          searchQuery,   // recherche
          undefined,     // status
          false          // is_client = false pour les vendus
        );
        setPlincs(response.data);
        setTotalPages(response.total_pages);
      } catch (error) {
        console.error('Error fetching plincs:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlincs();
  }, [userId, currentPage, searchQuery]);

  return (
    <div className="rounded-2xl p-2">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-8">
          <button
            onClick={() => router.push(".")}
            className="px-4 py-2 text-base text-neutral-medium font-medium hover:text-neutral-high transition-colors"
          >
            Achetés
          </button>
          <button className="px-4 py-2 text-base text-blue border-b-2 border-blue font-medium relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue">
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
        data={plincs} 
        loading={isLoading}
        pagination={{
          currentPage: currentPage,
          totalPages: totalPages,
          onPageChange: (page: number) => setCurrentPage(page)
        }}
      />
    </div>
  );
};

export default UserPlincsVendus;
