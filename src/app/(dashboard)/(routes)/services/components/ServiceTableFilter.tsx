import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { SortField, SortOrder } from "@/hooks/useValidations";
import { cn } from "@/lib/utils";
import { AlignCenter, ChevronDown, ChevronsUpDown, Search } from "lucide-react";
import { useState } from "react";

interface StatutDataTableFilterProps {
	selectedStatus: number | undefined;
	setSelectedStatus: (isActive?: number) => void;
	searchQuery: string;
	setSearchQuery: (query: string) => void;
	sortField: SortField;
	setSortField: (field: SortField) => void;
	sortOrder: SortOrder;
	setSortOrder: (order: SortOrder) => void;
	refetch: () => void;
}

export function StatutDataTableFilter({
	selectedStatus,
	setSelectedStatus,
	searchQuery,
	setSearchQuery,
	sortField,
	setSortField,
	sortOrder,
	setSortOrder,
	refetch,
}: StatutDataTableFilterProps) {
	const options = [
		{ label: "Tout", value: undefined },
		{ label: "Activé", value: 1 },
		{ label: "Désactivé", value: 0 },
	];

	const handleFilterClick = (value?: number) => {
		const newStatus = selectedStatus === value ? undefined : value;
		setSelectedStatus(newStatus);
		refetch();
	};

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(e.target.value);
	};

	// Gestion du tri par date
	const handleDateSort = () => {
		// Si on trie déjà par date, on inverse l'ordre
		if (sortField === "created_at") {
			setSortOrder(sortOrder === "asc" ? "desc" : "asc");
		} else {
			// Sinon, on change le champ de tri pour date
			setSortField("created_at");
			setSortOrder("desc");
		}
		refetch();
	};

	// Gestion du tri par ventes
	const handleSalesSort = () => {
		// Si on trie déjà par ventes, on inverse l'ordre
		if (sortField === "number_of_sells") {
			setSortOrder(sortOrder === "asc" ? "desc" : "asc");
		} else {
			// Sinon, on change le champ de tri pour ventes
			setSortField("number_of_sells");
			setSortOrder("desc");
		}
		refetch();
	};

	return (
		<div className="flex justify-between items-center w-full mb-5">
			<div className="flex items-center gap-2">
				{options.map((option, index) => {
					const isActive = selectedStatus === option.value || (option.value === undefined && selectedStatus === undefined);

					return (
						<Button
							key={index}
							size="sm"
							variant={isActive ? "default" : "outline"}
							onClick={() => handleFilterClick(option.value)}
						>
							{option.label}
						</Button>
					);
				})}
			</div>

			<div className="flex items-center justify-end gap-2">
				<div className="relative flex-1 w-fit">
					<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-input-placeholder" />
					<Input
						placeholder="Rechercher"
						className="pl-9 h-10 w-fit"
						value={searchQuery}
						onChange={handleSearchChange}
					/>
				</div>
				{/* Bouton Trier par Date */}
				<Button
					variant="outline"
					className={cn(
						"h-10 px-4 flex items-center gap-2 border border-neutral-low rounded-full",
						sortField === "created_at" && "border-blue"
					)}
					onClick={handleDateSort}
				>
					<AlignCenter className="h-4 w-4" />
					<span className={cn(sortField === "created_at" && "text-blue")}>Trier par Date</span>
					{sortField === "created_at" && (
						<span className="ml-1 text-blue">
							{sortOrder === "asc" ? "↑" : "↓"}
						</span>
					)}
				</Button>

				{/* Bouton Ventes avec indication d'ordre ascendant/descendant */}
				<Button
					variant="outline"
					className={cn(
						"h-10 px-4 flex items-center gap-2 border border-neutral-low rounded-full",
						sortField === "number_of_sells" && "border-blue"
					)}
					onClick={handleSalesSort}
				>
					<span className={cn(sortField === "number_of_sells" && "text-blue")}>
						Ventes {sortField === "number_of_sells" && (sortOrder === "asc" ? "(Croissant)" : "(Décroissant)")}
					</span>
					<ChevronsUpDown className={cn("h-4 w-4", sortField === "number_of_sells" && "text-blue")} />
				</Button>
			</div>
		</div>
	);
}
