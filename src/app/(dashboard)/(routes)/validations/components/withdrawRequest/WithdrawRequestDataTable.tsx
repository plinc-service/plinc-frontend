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

import WithdrawRequestPagination from "./WithdrawRequestPagination";
import WithdrawRequestTableBody from "./WithdrawRequestTableBody";

interface WithdrawalRequestsDataTableProps<TData extends object, TValue> {
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

export function WithdrawalRequestsDataTable<TData extends object, TValue>({
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
}: WithdrawalRequestsDataTableProps<TData, TValue>) {
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
						<WithdrawRequestTableBody
							table={table}
							columns={columns}
							isLoading={isLoading}
							error={error}
							onClick={onClick} />
					</Table>
				</div>

				<WithdrawRequestPagination
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