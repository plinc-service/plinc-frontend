import { TableBody, TableCell, TableRow } from "@/components/ui/Table";
import { flexRender, Table } from "@tanstack/react-table";

interface ServicesTableBodyProps<TData> {
	table: Table<TData>;
	onRowClick: (item: TData) => void;
}

const ServicesRequestTableBody = <TData extends object>({
	table,
	onRowClick,
}: ServicesTableBodyProps<TData>) => {
	return (
		<TableBody>
			{table.getRowModel().rows?.length ? (
				table.getRowModel().rows.map((row) => (
					<TableRow
						key={row.id}
						className="hover:bg-brand-lowest cursor-pointer border-neutral-200"
						onClick={() => onRowClick(row.original)}
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
						colSpan={table.getAllColumns().length}
						className="h-24 text-center"
					>
						Aucun résultat.
					</TableCell>
				</TableRow>
			)}
		</TableBody>
	);
};

export default ServicesRequestTableBody;