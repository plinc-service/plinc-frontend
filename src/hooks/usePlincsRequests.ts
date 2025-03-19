import { plincService } from "@/services/PlincService";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";

export type SortField = "date" | "status" | "serviceName";
export type SortOrder = "asc" | "desc";

// Mapper pour convertir les noms de champs frontend vers backend
const sortFieldMapping: Record<SortField, string> = {
  date: "created_at",
  status: "status",
  serviceName: "service__name"
};

export type PlincFilterStatus = 
  | "all" 
  | "en-attente" 
  | "accepte" 
  | "confirme" 
  | "en-cours" 
  | "termine" 
  | "annule" 
  | "rejete"
  | "livre"
  | "litige";

export const getStatusNumber = (filterValue: string): number | undefined => {
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
    case "all": return undefined; 
    default: return undefined;
  }
};

export const usePlincsRequests = (initialPageSize = 10) => {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(initialPageSize);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<PlincFilterStatus>("all");
  const [sortField, setSortField] = useState<SortField | "">("");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [totalPages, setTotalPages] = useState(1);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [previousPage, setPreviousPage] = useState<string | null>(null);


  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["plincs", page, pageSize, searchQuery, selectedStatus, sortField, sortOrder],
    queryFn: async () => {
      const statusNumber = selectedStatus !== "all" ? getStatusNumber(selectedStatus) : undefined;
      
      // Convertir le nom de champ frontend en nom de champ backend
      const backendSortField = sortField ? sortFieldMapping[sortField as SortField] : undefined;
      
      
      return plincService.getAllPlincs(
        page,
        pageSize,
        backendSortField,
        sortOrder,
        searchQuery,
        statusNumber
      );
    }
  });

  // Mettre à jour les informations de pagination à partir de la réponse
  useEffect(() => {
    if (data) {
      setTotalPages(data.total_pages);
      setNextPage(data.next);
      setPreviousPage(data.previous);
    }
  }, [data]);

  const goToNextPage = () => {
    if (nextPage && page < totalPages) {
      setPage(page + 1);
    }
  };

  const goToPreviousPage = () => {
    if (previousPage && page > 1) {
      setPage(page - 1);
    }
  };

  const goToPage = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setPage(pageNumber);
    }
  };

  const handleSort = (field: SortField) => {
    
    if (sortField === field) {
      const newOrder = sortOrder === "asc" ? "desc" : "asc";
      setSortOrder(newOrder);
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
    setPage(1); 
  };

  // Handler pour la recherche
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setPage(1); 
  };

  const handleStatusChange = (status: PlincFilterStatus) => {
    setSelectedStatus(status);
    setPage(1); 
  };

  return {
    data: data?.data || [],
    loading: isLoading,
    error: error ? String(error) : undefined,
    refetch,
    searchQuery,
    setSearchQuery: handleSearchChange,
    selectedStatus,
    setSelectedStatus: handleStatusChange,
    sortField,
    sortOrder,
    handleSort,
    page,
    totalPages,
    nextPage, 
    previousPage,
    goToNextPage,
    goToPreviousPage,
    goToPage,
  };
};
