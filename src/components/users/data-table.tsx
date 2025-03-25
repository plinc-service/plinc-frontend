"use client";

import * as React from "react";
import { useRouter, usePathname } from "next/navigation";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";

import { Button } from "@/components/ui/Button";
import { ChevronRight, ChevronLeft } from "lucide-react";
import DataTableSkeleton from "./DataTableSkeleton";
interface DataTablePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

interface DataTableProps<TData extends object, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  loading?: boolean;
  pagination?: DataTablePaginationProps;
}

const getPaginationItems = (currentPage: number, totalPages: number): (number | string)[] => {
  const items: (number | string)[] = [];
  const maxVisiblePages = 5;

  if (totalPages <= maxVisiblePages) {
    for (let i = 1; i <= totalPages; i++) {
      items.push(i);
    }
  } else {
    const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (startPage > 1) {
      items.push(1);
      if (startPage > 2) {
        items.push('...');
      }
    }

    for (let i = Math.max(2, startPage); i <= Math.min(totalPages - 1, endPage); i++) {
      items.push(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        items.push('...');
      }
      items.push(totalPages);
    }
  }

  return items;
};

export function DataTable<TData extends object, TValue>({
  columns,
  data,
  loading = false,
  pagination,
}: DataTableProps<TData, TValue>) {
  const router = useRouter();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const [pageIndex, setPageIndex] = React.useState(
    (pagination?.currentPage ?? 1) - 1
  );
  const [pageSize] = React.useState(10);

  const paginationState = React.useMemo(
    () => ({
      pageSize,
      pageIndex,
    }),
    [pageSize, pageIndex]
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: !!pagination,
    pageCount: pagination?.totalPages ?? -1,
    state: {
      pagination: paginationState,
    },
    onPaginationChange: (updater) => {
      if (typeof updater === "function") {
        const newState = updater(paginationState);
        setPageIndex(newState.pageIndex);
      }
    },
  });

  React.useEffect(() => {
    if (!mounted || !pagination) return;

    const newPage = pageIndex + 1;
    if (newPage !== pagination.currentPage) {
      pagination.onPageChange(newPage);
    }
  }, [mounted, pagination, pageIndex, pagination?.currentPage]);

  const pathname = usePathname();
  const pathTab = pathname.split("/");
  const isSpecificPage = pathTab[1] + pathTab[3] === "usersplincs";

  if (!mounted) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div>
        <div className="rounded-md ">
          {loading ? (
           <DataTableSkeleton/>
          ) : (
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow
                    key={headerGroup.id}
                    className="hover:bg-transparent border-neutral-200"
                  >
                    {headerGroup.headers.map((header) => (
                      <TableHead
                        key={header.id}
                        className="h-11 px-6 text-neutral-high text-base font-medium"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      className="hover:bg-brand-lowest cursor-pointer border-neutral-200"
                      onClick={() => {
                        const item = row.original;
                        if (!isSpecificPage) {
                          if ("id" in item && item.id) {
                            const id = String(item.id).replace(/^#/, "");
                            router.push(`/users/${id}`);
                          }
                        }
                      }}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id} className="px-6 py-3">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center text-base text-neutral-high"
                    >
                      Aucune donnée pour le moment.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </div>

        {pagination && (
          <div className="flex items-center justify-between py-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage() || loading}
              className="h-8 text-sm text-neutral-high"
            >
              <ChevronLeft className="mr-1 h-4 w-4 text-neutral-high" />
              Précédent
            </Button>
            <div className="flex items-center gap-1">
              {getPaginationItems(pagination.currentPage, pagination.totalPages).map((item, index) => (
                typeof item === 'number' ? (
                  <Button
                    key={`page-${item}`}
                    variant={pagination.currentPage === item ? "default" : "ghost"}
                    size="icon"
                    className={`h-8 w-8 text-sm ${pagination.currentPage === item
                      ? "bg-primary/10 hover:bg-primary/20 text-primary"
                      : "text-muted-foreground hover:text-foreground"
                      }`}
                    onClick={() => pagination.onPageChange(item)}
                  >
                    {item}
                  </Button>
                ) : (
                  <span key={`ellipsis-${index}`} className="px-2">...</span>
                )
              ))}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage() || loading}
              className="h-8 text-sm text-neutral-high"
            >
              Suivant
              <ChevronRight className="ml-1 h-4 w-4 text-neutral-high" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
