import { Category } from "@/interfaces/categoryInterface";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronRight } from "lucide-react";

export const CategoryColumns: ColumnDef<Category>[] = [
	{
		accessorKey: "id",
		header: "ID",
	},
	{
		accessorKey: "name",
		header: "Catégories",
		cell: ({ row }) => {
			const category = row.original;
			return (
				<div className="flex items-center gap-3">
					<span className={`h-4 w-4 rounded-[2px]`}
						style={{ backgroundColor: category.color }}
					></span>
					<span className="font-medium text-sm text-neutral-high">{category.name}</span>
				</div>
			);
		},
	},
	{
		accessorKey: "created_at",
		header: "Ajouté le",
		cell: ({ row }) => {
			const date = row.original.created_at;
			const formattedDate = new Date(date).toLocaleDateString("fr-FR", {
				day: "2-digit",
				month: "2-digit",
				year: "numeric"
			}).replace(/\//g, "-");
			return (
				<div className="min-w-[140px]">
					<span className="text-neutral-high">{formattedDate}</span>
				</div>
			)
		}
	},
	{
		id: "actions",
		cell: ({ row }) => {
			void row;
			return (
				<div className="flex justify-end">
					<ChevronRight className="h-4 w-4 text-neutral-high" />
				</div>
			);
		},
	},
]
