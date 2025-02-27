import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { AlignCenter, ChevronDown, ChevronsUpDown, Search } from "lucide-react";

interface StatutDataTableFilterProps {
	searchQuery: string;
	setSearchQuery: (query: string) => void;
}

export function ServicesDataTableFilter({
	searchQuery,
	setSearchQuery,
}: StatutDataTableFilterProps) {

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(e.target.value);
	};

	return (
		<>
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
					<span>Montant</span>
					<ChevronsUpDown className="h-4 w-4" />
				</Button>
			</div>
		</>
	);
}
