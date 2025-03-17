"use client";

import TopBar from "@/components/layout/TopBar";
import UsersTable from "@/components/users/UsersTable";
import { Search, AlignCenter, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useState, useCallback, useMemo } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { useUsers } from "@/hooks/useUsersList";

export type SortField = "username" | "email" | "date_joined";
export type SortOrder = "asc" | "desc";

const UsersPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<SortField>("date_joined");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

  // Récupérer les données brutes de l'API
  const {
    users: rawUsers,
    loading,
    error,
    pagination,
  } = useUsers({
    page: currentPage,
  });

  // Filtrer et trier les données côté client
  const filteredAndSortedUsers = useMemo(() => {
    if (!rawUsers) return [];

    let result = [...rawUsers];

    // Filtrage par recherche
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (user) =>
          user.username.toLowerCase().includes(query) ||
          user.email.toLowerCase().includes(query)
      );
    }

    // Tri des données
    result.sort((a, b) => {
      if (sortField === "date_joined") {
        const aDate = new Date(a.date_joined).getTime();
        const bDate = new Date(b.date_joined).getTime();
        return sortOrder === "asc" ? aDate - bDate : bDate - aDate;
      }

      const aValue = a[sortField].toLowerCase();
      const bValue = b[sortField].toLowerCase();
      return sortOrder === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    });

    return result;
  }, [rawUsers, searchQuery, sortField, sortOrder]);

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, []);

  const handleSort = useCallback(
    (field: SortField) => {
      if (field === sortField) {
        setSortOrder((order) => (order === "asc" ? "desc" : "asc"));
      } else {
        setSortField(field);
        setSortOrder("asc");
      }
    },
    [sortField]
  );

  // const getSortLabel = (field: SortField): string => {
  //   const labels: Record<SortField, string> = {
  //     username: "Nom d'utilisateur",
  //     email: "Email",
  //     date_joined: "Date d'inscription",
  //   };
  //   return labels[field];
  // };

  return (
    <div className="relative w-full h-full p-3">
      <TopBar pageName="Utilisateurs" />

      <div className="flex items-center justify-between my-5 mx-3">
        <div className="relative flex-1 max-w-[610px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-input-placeholder" />
          <Input
            placeholder="Rechercher par nom ou email"
            className="pl-9 h-10"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>

        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="h-10 px-4 flex items-center gap-2 border border-neutral-low rounded-full"
              >
                <AlignCenter className="h-4 w-4" />
                <span>Trier par</span>
                <ChevronDown className="h-4 w-4 text-neutral-high" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {Object.entries({
                username: "Nom d'utilisateur",
                email: "Email",
                date_joined: "Date d'inscription",
              }).map(([field, label]) => (
                <DropdownMenuItem
                  key={field}
                  onClick={() => handleSort(field as SortField)}
                  className="flex items-center justify-between"
                >
                  {label}
                  {sortField === field && (
                    <span className="text-xs text-neutral-medium">
                      {sortOrder === "asc" ? "↑" : "↓"}
                    </span>
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="mt-10">
        <UsersTable
          data={filteredAndSortedUsers}
          loading={loading}
          error={error || ""}
          pagination={{
            currentPage,
            previous: Boolean(pagination?.previous),
            next: Boolean(pagination?.next),
          }}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default UsersPage;
