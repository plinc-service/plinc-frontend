"use client";

import { columns } from "./columns";
import { DataTable } from "./data-table";
import UserSkeleton from "./UserSkeleton";
import { User } from "@/interfaces/userInterface";

interface UsersTableProps {
  data: User[];
  loading: boolean;
  error: string | null;
  pagination: {
    currentPage: number;
    previous: boolean;
    next: boolean;
  };
  onPageChange: (page: number) => void;
}

const UsersTable: React.FC<UsersTableProps> = ({ 
  data, 
  loading, 
  error, 
  pagination,
  onPageChange 
}) => {
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
      <DataTable columns={columns} data={data} />
      {(pagination.previous || pagination.next) && (
        <div className="mt-4 flex items-center justify-end gap-2">
          <button
            onClick={() => onPageChange(pagination.currentPage - 1)}
            disabled={!pagination.previous}
            className="px-3 py-2 rounded-lg border border-neutral-200 disabled:opacity-50"
          >
            Précédent
          </button>
          <button
            onClick={() => onPageChange(pagination.currentPage + 1)}
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
