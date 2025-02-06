"use client";

import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useUsers } from "@/hooks/useUsers";
import { useState } from "react";
import UserSkeleton from "./UserSkeleton";
import { SortField, SortOrder } from "@/app/(dashboard)/(routes)/users/page";

interface UsersTableProps {
  searchQuery: string;
  sortField: SortField;
  sortOrder: SortOrder;
}

const UsersTable: React.FC<UsersTableProps> = ({ searchQuery, sortField, sortOrder }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { users, loading, error, pagination } = useUsers({
    page: currentPage,
    searchQuery,
    sortField,
    sortOrder
  });

  if (loading) {
    return (
      <div className="space-y-1">
        {Array.from({ length: 10 }, (_, index) => (
          <UserSkeleton key={`skeleton-${index}`} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full p-4 bg-red-50 border-l-4 border-red-400 text-red-700">
        {error}
      </div>
    );
  }

  return (
    <div>
      <DataTable columns={columns} data={users} />
      {(pagination.previous || pagination.next) && (
        <div className="mt-4 flex items-center justify-end gap-2">
          <button
            onClick={() => setCurrentPage(prev => prev - 1)}
            disabled={!pagination.previous}
            className="px-3 py-2 rounded-lg border border-neutral-200 disabled:opacity-50"
          >
            Précédent
          </button>
          <button
            onClick={() => setCurrentPage(prev => prev + 1)}
            disabled={!pagination.next}
            className="px-3 py-2 rounded-lg border border-neutral-200 disabled:opacity-50"
          >
            Suivant
          </button>
        </div>
      )}
    </div>
  );
};

export default UsersTable;
