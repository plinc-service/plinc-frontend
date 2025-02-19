"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
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

  const [pageIndex, setPageIndex] = React.useState((pagination?.currentPage ?? 1) - 1);
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
      if (typeof updater === 'function') {
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

  if (!mounted) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div>
        <div className="rounded-md ">
          {loading ? (
            <div className="w-full h-32 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue" />
            </div>
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
                      if ("id" in item && item.id) {
                        const id = String(item.id).replace(/^#/, "");
                        router.push(`/users/${id}`);
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
                    className="h-24 text-center"
                  >
                    Aucun résultat.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          )}
        </div>

        {pagination && (
          <div className="flex items-center justify-end space-x-4 py-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage() || loading}
              className="h-8 text-sm text-neutral-high"
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Précédent
            </Button>
            <span className="text-sm text-neutral-medium">
              Page {pagination.currentPage} sur {pagination.totalPages}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage() || loading}
              className="h-8 text-sm text-neutral-high"
            >
              Suivant
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
