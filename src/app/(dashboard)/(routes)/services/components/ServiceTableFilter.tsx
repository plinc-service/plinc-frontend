import { Button } from "@/components/ui/Button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from "@/components/ui/DropdownMenu";
import { Input } from "@/components/ui/Input";
import { SortField } from "@/hooks/useValidations";
import { ChevronDown, Search } from "lucide-react";

interface StatutDataTableFilterProps {
	selectedStatus: number | undefined;
	setSelectedStatus: (isActive?: number) => void;
	searchQuery: string;
	setSearchQuery: (query: string) => void;
	sortField: SortField | null;
	handleSort: (field: SortField) => void;
	refetch: () => void;
}

export function StatutDataTableFilter({
	selectedStatus,
	setSelectedStatus,
	searchQuery,
	setSearchQuery,
	sortField,
	handleSort,
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
							<span>
								{sortField === "created_at" 
									? "Trié par Date" 
									: "Trier par"}
							</span>
							<ChevronDown className="h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end" className="w-44">
						<DropdownMenuItem 
							onClick={() => handleSort("created_at")} 
							className={`flex items-center ${sortField === "created_at" ? "bg-blue/10" : ""}`}
						>
							Trier par Date
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</div>
	);
}
