import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { AlignCenter, ChevronDown, ChevronsUpDown, Search } from "lucide-react";

// Modifiez d'abord l'interface StatutDataTableFilterProps pour ajouter les propriétés nécessaires
interface StatutDataTableFilterProps {
	selectedStatus: number | undefined;
	setSelectedStatus: (isActive?: number) => void;
	searchQuery: string;                   // Nouvelle propriété
	setSearchQuery: (query: string) => void; // Nouvelle propriété
	refetch: () => void;
}

export function StatutDataTableFilter({
	selectedStatus,
	setSelectedStatus,
	searchQuery,
	setSearchQuery,
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

	// Nouvelle fonction pour gérer les changements dans l'input de recherche
	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(e.target.value);
	};

	// Fonction pour déclencher la recherche lors de l'appui sur Entrée
	const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			refetch();
		}
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
						onKeyDown={handleSearchKeyDown}
					/>
				</div>
				<Button
					variant="outline"
					className="h-10 px-4 flex items-center gap-2 border border-neutral-low rounded-full"
				>
					<AlignCenter className="h-4 w-4" />
					<span>Trier par</span>
					<ChevronDown className="h-4 w-4 text-neutral-high" />
				</Button>
				<Button
					variant="outline"
					className="h-10 px-4 flex items-center gap-2 border border-neutral-low rounded-full"
				>
					<span>Ventes</span>
					<ChevronsUpDown className="h-4 w-4" />
				</Button>
			</div>
		</div>
	);
}
