import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { SortField, SortOrder } from "@/hooks/useValidations";
import { cn } from "@/lib/utils";
import { AlignCenter, Check, ChevronDown, ChevronsUpDown, Search } from "lucide-react";
import { useState } from "react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";

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
	const handleDateSort = (order: SortOrder) => {
		// Mise à jour des états de tri
		setSortField("created_at");
		setSortOrder(order);
		
		// Force le refetch après la mise à jour de l'état
		setTimeout(() => {
			refetch();
		}, 10);
	};

	// Gestion du tri par ventes
	const handleSalesSort = (order: SortOrder) => {
		// Mise à jour des états de tri
		setSortField("number_of_sells");
		setSortOrder(order);
		
		// Force le refetch après la mise à jour de l'état
		setTimeout(() => {
			refetch();
		}, 10);
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

				{/* Menu déroulant pour le tri */}
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button 
							variant="outline" 
							className="h-10 px-4 flex items-center gap-2 border border-neutral-low rounded-full"
						>
							<span>Trier par</span>
							<ChevronDown className="h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end" className="w-56">
						{/* Options de tri par date */}
						<DropdownMenuLabel>Date d'inscription</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem 
							onClick={() => handleDateSort("asc")} 
							className={`flex items-center justify-between ${sortField === "created_at" && sortOrder === "asc" ? "bg-blue/10" : ""}`}
						>
							<span>Du plus ancien au plus récent</span>
							{sortField === "created_at" && sortOrder === "asc" && (
								<Check className="h-4 w-4 ml-2 text-blue" />
							)}
						</DropdownMenuItem>
						<DropdownMenuItem 
							onClick={() => handleDateSort("desc")} 
							className={`flex items-center justify-between ${sortField === "created_at" && sortOrder === "desc" ? "bg-blue/10" : ""}`}
						>
							<span>Du plus récent au plus ancien</span>
							{sortField === "created_at" && sortOrder === "desc" && (
								<Check className="h-4 w-4 ml-2 text-blue" />
							)}
						</DropdownMenuItem>

						{/* Options de tri par ventes */}
						<DropdownMenuLabel className="mt-2">Nombre de ventes</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem 
							onClick={() => handleSalesSort("asc")} 
							className={`flex items-center justify-between ${sortField === "number_of_sells" && sortOrder === "asc" ? "bg-blue/10" : ""}`}
						>
							<span>Ventes (croissant)</span>
							{sortField === "number_of_sells" && sortOrder === "asc" && (
								<Check className="h-4 w-4 ml-2 text-blue" />
							)}
						</DropdownMenuItem>
						<DropdownMenuItem 
							onClick={() => handleSalesSort("desc")} 
							className={`flex items-center justify-between ${sortField === "number_of_sells" && sortOrder === "desc" ? "bg-blue/10" : ""}`}
						>
							<span>Ventes (décroissant)</span>
							{sortField === "number_of_sells" && sortOrder === "desc" && (
								<Check className="h-4 w-4 ml-2 text-blue" />
							)}
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</div>
	);
}
