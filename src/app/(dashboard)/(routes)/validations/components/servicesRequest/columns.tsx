import ProfileImage from "@/components/ui/ProfileImage";
import { Service } from "@/interfaces/serviceInterface";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronRight } from "lucide-react";
import Image from "next/image";

export const ServiceRequestColumns: ColumnDef<Service>[] = [
	{
		accessorKey: "id",
		header: "ID",
	},
	{
		accessorKey: "email",
		header: "Email",
		cell: ({ row }) => {
			const user = row.original.owner;
			return (
				<div className="flex items-center gap-3">
					<span className="font-medium text-sm text-neutral-high">{user?.email || "non disponible"}</span>
				</div>
			);
		},
	},
	{
		id: "serviceName",
		header: "Service",
		cell: ({ row }) => {
			const service = row.original;
			return (
				<div className="min-w-[150px]">
					<span className="text-neutral-high">{service.name}</span>
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
				<div>
					<span className="text-neutral-high">{formattedDate}</span>
				</div>
			)
		}
	},
	{
		accessorKey: "provider",
		header: "Prestataire",
		cell: ({ row }) => {
			if (!row.original || !row.original.owner) {
				return (
					<div className="flex items-center gap-3 min-w-[150px]">
						<div className="h-8 w-8 rounded-full bg-neutral-100 flex items-center justify-center overflow-hidden">
							<ProfileImage src="/avatar.png" alt="Utilisateur inconnu" />
						</div>
						<span className="font-medium text-sm text-neutral-high">Utilisateur inconnu</span>
					</div>
				);
			}

			const provider = row.original;
			return (
				<div className="flex items-center gap-3 min-w-[150px]">
					<div className="h-8 w-8 rounded-full bg-neutral-100 flex items-center justify-center overflow-hidden">
						<Image
							width={32}
							height={32}
							src={provider.owner?.image_url || "/avatar.svg"}
							alt={provider.owner?.username}
							className="rounded-full"
						/>
					</div>
					<span className="font-medium text-sm text-neutral-high">{provider.owner?.username}</span>
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
