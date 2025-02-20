"use client";

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
import { ChevronLeft, ChevronRight } from "lucide-react";

interface WithdrawalRequestsDataTableProps<TData extends object, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	onClick: (item: TData) => void;
}

export function WithdrawalRequestsDataTable<TData extends object, TValue>({
	columns,
	data,
	onClick
}: WithdrawalRequestsDataTableProps<TData, TValue>) {
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		initialState: {
			pagination: {
				pageSize: 11,
			},
		},
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
						<TableBody>
							{table.getRowModel().rows?.length ? (
								table.getRowModel().rows.map((row) => (
									<TableRow
										key={row.id}
										className="hover:bg-brand-lowest cursor-pointer border-neutral-200"
										onClick={() => onClick(row.original)}
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
