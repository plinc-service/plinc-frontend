import { ChevronDown } from "lucide-react"
import { useState } from "react"
import { Button } from "../ui/Button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/DropdownMenu"
const FILTER_OPTIONS = [
	{
		value: 1,
		label: "Services"
	},
	{
		value: 2,
		label: "Ventes"
	},
	{
		value: 3,
		label: "Commissions"
	}
]

const AnalysisOfPlincChart = () => {
	const [selectedFilter, setSelectedFilter] = useState(FILTER_OPTIONS[0]);

	const handleFilterChange = (value: number, label: string) => {
		setSelectedFilter({ value, label });
	};

	return (
		<div className="flex flex-col gap-5 p-4 rounded-[22px] bg-background border-[#EFEFEF] border w-full mb-5">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3.5">
					<h2 className="text-lg font-medium text-neutral-high">Analyse</h2>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" disabled={true} size="sm" className="bg-transparent hover:bg-transparent border-none">
								<span>Par Catégorie</span>
								<ChevronDown className="h-4 w-4 opacity-50" />
							</Button>
						</DropdownMenuTrigger>
					</DropdownMenu>
				</div>
				<div>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="outline" size="sm">
								<span>{selectedFilter.label}</span>
								<ChevronDown className="h-4 w-4 opacity-50" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							{FILTER_OPTIONS.map((option) => (
								<DropdownMenuItem key={option.value}
									onClick={() => handleFilterChange(option.value, option.label)}
									className={selectedFilter.value === option.value ? "bg-primary/10" : ""}
								>
									{option.label}
								</DropdownMenuItem>
							))}
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>

			<div className="grid grid-cols-2 gap-5">
				<div className="flex flex-col gap-1">
					<h3 className="text-sm font-medium text-neutral">CA Total</h3>
					<span className="text-[30px] font-semibold text-primary">119,890€</span>
				</div>
				<div className="flex flex-col gap-1">
					<h3 className="text-sm font-medium text-neutral">Revenus</h3>
					<span className="text-[30px] font-semibold text-primary">12,937€</span>
				</div>
			</div>

			{/* <div>
				<Test />
			</div> */}
		</div>
	)
}

export default AnalysisOfPlincChart