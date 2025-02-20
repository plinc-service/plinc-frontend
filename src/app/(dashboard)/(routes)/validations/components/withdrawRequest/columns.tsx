import ProfileImage from "@/components/ui/ProfileImage";
import { Transaction } from "@/interfaces/transactionInterface";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronRight } from "lucide-react";
import Image from "next/image";

export const columns: ColumnDef<Transaction>[] = [
	{
		accessorKey: "id",
		header: "ID",
	},
	{
		accessorKey: "provider",
		header: "Prestataire",
		cell: ({ row }) => {
			if (!row.original || !row.original.user) {
				return (
					<div className="flex items-center gap-3 min-w-[150px]">
						<div className="h-8 w-8 rounded-full bg-neutral-100 flex items-center justify-center overflow-hidden">
							<ProfileImage src="/avatar.png" alt="Utilisateur inconnu" />
						</div>
						<span className="font-medium text-sm text-neutral-high">Utilisateur inconnu</span>
					</div>
				);
			}
			const provider = row.original.user;
			return (
				<div className="flex items-center gap-3 min-w-[150px]">
					<div className="h-8 w-8 rounded-full bg-neutral-100 flex items-center justify-center overflow-hidden">
						<Image
							width={32}
							height={32}
							src={provider.image_url || "/avatar.svg"}
							alt={provider.username}
							className="rounded-full"
						/>
					</div>
					<span className="font-medium text-sm text-neutral-high">{provider.username}</span>
				</div>
			);
		},
	},
	{
		accessorKey: "mail",
		header: "Email",
		cell: ({ row }) => {
			const user = row.original.user;
			return (
				<div className="flex items-center gap-3">
					<span className="font-medium text-sm text-neutral-high">{user?.email}</span>
				</div>
			);
		},
	},
	{
		id: "amount",
		header: "Montant",
		cell: ({ row }) => {
			const amount = row.original;
			return (
				<div className="min-w-[80px]">
					<span className="text-neutral-high">{amount.amount}€</span>
				</div>
			);
		},
	},
	{
		accessorKey: "date",
		header: "Date",
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
