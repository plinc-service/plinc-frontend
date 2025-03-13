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

import CategoryDataTableBody from "./CategoryDataTableBody";
import CategoryTablePagination from "./CategoryTablePagination";

interface CategoryDataTableProps<TData extends object, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	onClick: (item: TData) => void;
	isLoading: boolean;
	error: string | null;
	page: number;
	totalPages: number;
	onNextPage: () => void;
	onPreviousPage: () => void;
	onPageChange: (page: number) => void;
}

export function CategoryDataTable<TData extends object, TValue>({
	columns,
	data,
	onClick,
	isLoading,
	error,
	page,
	totalPages,
	onNextPage,
	onPreviousPage,
	onPageChange,
}: CategoryDataTableProps<TData, TValue>) {
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<div className="space-y-4 flex flex-col h-full">
			<div className="flex flex-col gap-4">
				<div className="rounded-md flex-1">
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

				<CategoryTablePagination
					page={page}
					totalPages={totalPages}
					onNextPage={onNextPage}
					onPreviousPage={onPreviousPage}
					onPageChange={onPageChange}
					data={data}
				/>
			</div>
		</div>
	);
}