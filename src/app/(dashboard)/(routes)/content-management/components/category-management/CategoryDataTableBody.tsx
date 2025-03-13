import { Skeleton } from "@/components/ui/Skeleton";
import { TableBody, TableCell, TableRow } from "@/components/ui/Table";
import { ColumnDef, flexRender, Table } from "@tanstack/react-table";

interface CategoryTableBodyProps<TData, TValue> {
	table: Table<TData>;
	columns: ColumnDef<TData, TValue>[];
	isLoading: boolean;
	error: string | null;
	onClick: (item: TData) => void;
}

const CategoryDataTableBody = <TData, TValue>({
	table,
	columns,
	isLoading,
	error,
	onClick,
}: CategoryTableBodyProps<TData, TValue>) => {
	if (isLoading) {
		return (
			<TableBody>
				{Array.from({ length: 8 }).map((_, index) => (
					<TableRow
						key={index}
						className="hover:bg-brand-lowest cursor-pointer border-neutral-200 h-[65px]"
					>
						{columns.map((_, colIndex) => (
							<TableCell key={colIndex}>
								<Skeleton className="h-6 w-full" />
							</TableCell>
						))}
					</TableRow>
				))}
			</TableBody>
		);
	}

	if (error) {
		return (
			<TableBody>
				<TableRow>
					<TableCell colSpan={columns.length} className="h-24 text-center">
						{error}
					</TableCell>
				</TableRow>
			</TableBody>
		);
	}

	return (
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
	);
};

export default CategoryDataTableBody;