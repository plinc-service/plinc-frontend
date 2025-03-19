import React, { useState } from "react";
import { useUsersRequests } from "@/hooks/useUsersRequests";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { AlignCenter, ChevronDown, Search } from "lucide-react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import UserSkeleton from "./UserSkeleton";

const sortOptions = [
  { label: "Nom d'utilisateur", value: "username" },
  { label: "Email", value: "email" },
  { label: "Date d'inscription", value: "date_joined" },
];

const UsersTableWrapper: React.FC = () => {
  const [showSortMenu, setShowSortMenu] = useState(false);

  const {
    data: users,
    loading,
    error,
    searchQuery,
    setSearchQuery: handleSearchChange,
    sortField,
    sortOrder,
    handleSort,
    page,
    totalPages,
    goToPage,
  } = useUsersRequests();

  if (error) {
    return (
      <div className="w-full p-4 bg-red-50 border-l-4 border-red-400 text-red-700">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between my-5">
        <div className="relative w-[280px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-high" />
          <Input
            placeholder="Rechercher par nom ou email"
            className="pl-9 h-10"
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
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
                    handleSort(option.value as "username" | "email" | "date_joined");
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

      {loading ? (
        <div className="space-y-1">
          {Array.from({ length: 10 }, (_, index) => (
            <UserSkeleton key={`skeleton-${index}`} />
          ))}
        </div>
      ) : (
        <DataTable 
          columns={columns} 
          data={users} 
          loading={loading}
          pagination={{
            currentPage: page,
            totalPages: Math.max(totalPages, 1),
            onPageChange: goToPage
          }}
        />
      )}
    </div>
  );
};

export default UsersTableWrapper;
