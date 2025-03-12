"use client";

import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	useReactTable
} from "@tanstack/react-table";

import {
	Table,
	TableHead,
	TableHeader,
	TableRow
} from "@/components/ui/Table";

import { Button } from "@/components/ui/Button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CategoryDataTableBody from "./CategoryDataTableBody";

interface CategoryDataTableProps<TData extends object, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	onClick: (item: TData) => void;
	isLoading: boolean;
	error: string | null;
}

export function CategoryDataTable<TData extends object, TValue>({
	columns,
	data,
	onClick,
	isLoading,
	error,
}: CategoryDataTableProps<TData, TValue>) {
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<div className="space-y-4">
			<div>
				<div className="rounded-md">
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
						<CategoryDataTableBody
							table={table}
							columns={columns}
							isLoading={isLoading}
							error={error}
							onClick={onClick}
						/>
					</Table>
				</div>

				<div className="flex items-center justify-between py-4">
					<Button
						variant="ghost"
						size="sm"
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
						className="h-8 text-sm text-neutral-high"
					>
						<ChevronLeft className="ml-1 h-4 w-4 text-neutral-high" />
						Précédent
					</Button>
					<div className="flex items-center gap-1">
						{Array.from({ length: table.getPageCount() }, (_, i) => (
							<Button
								key={i}
								variant={
									table.getState().pagination.pageIndex === i
										? "default"
										: "ghost"
								}
								size="icon"
								onClick={() => table.setPageIndex(i)}
								className={`h-8 w-8 text-sm ${table.getState().pagination.pageIndex === i
									? "bg-primary/10 hover:bg-primary/20 text-primary"
									: "text-muted-foreground hover:text-foreground"
									}`}
							>
								{String(i + 1).padStart(2, "0")}
							</Button>
						))}
					</div>
					<Button
						variant="ghost"
						size="sm"
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}
						className="h-8 text-sm text-neutral-high"
					>
						Suivant
						<ChevronRight className="ml-1 h-4 w-4 text-neutral-high" />
					</Button>
				</div>
			</div>
		</div>
	);
}