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
import WithdrawRequestTableBody from "./WithdrawRequestTableBody";

interface WithdrawalRequestsDataTableProps<TData extends object, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	onRowClick: (item: TData) => void;
}

export function WithdrawalRequestsDataTable<TData extends object, TValue>({
	columns,
	data,
	onRowClick,
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
											className="text-sm font-normal"
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
							onRowClick={onRowClick}
						/>
					</Table>
				</div>
			</div>
		</div>
	);
}
