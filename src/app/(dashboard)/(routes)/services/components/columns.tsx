import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { Service } from "@/interfaces/serviceInterface";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronRight } from "lucide-react";

export const ServicesColumns: ColumnDef<Service>[] = [
	{
		accessorKey: "id",
		header: "ID",
	},
	{
		accessorKey: "serviceName",
		header: "Titre du service",
		cell: ({ row }) => {
			const service = row.original;
			return (
				<div className="flex items-center gap-3">
					<span className="font-medium text-sm text-neutral-high">{service.name}</span>
				</div>
			);
		},
	},
	{
		id: "serviceCategory",
		header: "Catégorie",
		cell: ({ row }) => {
			const service = row.original;
			return (
				<div className="min-w-[150px]">
					<span className="text-neutral-high">{service.category}</span>
				</div>
			);
		},
	},
	// {
	// 	id: "serviceSubCategory",
	// 	header: "Sous-catégorie",
	// 	cell: ({ row }) => {
	// 		const service = row.original;
	// 		return (
	// 			<div className="min-w-[150px]">
	// 				<span className="text-neutral-high">{service.sub_category}</span>
	// 			</div>
	// 		);
	// 	},
	// },
	{
		accessorKey: "created_at",
		header: "Créé le",
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
		accessorKey: "provider",
		header: "Prestataire",
		cell: ({ row }) => {
			const provider = row.original;
			return (
				<div className="flex items-center gap-3 min-w-[150px]">
					<div className="h-8 w-8 rounded-full bg-neutral-100 flex items-center justify-center overflow-hidden">
						<Avatar className="w-8 h-8">
							<AvatarImage src={provider.owner.image_url || undefined} alt={provider.owner.username} />
							<AvatarFallback>
								{provider.owner.username
									? provider.owner.username
										.trim()
										.split(" ")
										.map((part) => part[0])
										.join("")
										.slice(0, 2)
										.toUpperCase()
									: " "}
							</AvatarFallback>
						</Avatar>
					</div>
					<span className="font-medium text-sm text-neutral-high">{provider.owner.username}</span>
				</div>
			);
		},
	},
	{
		accessorKey: "number_of_sells",
		header: "Ventes",
		cell: ({ row }) => {
			const service = row.original;
			return (
				<div className="flex items-center gap-3 max-w-[120px] w-full">
					<span>{service.number_of_sells}</span>
				</div>
			);
		},
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
