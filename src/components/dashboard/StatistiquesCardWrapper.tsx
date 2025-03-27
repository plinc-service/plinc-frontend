import { useGlobalStats, useGraphStats } from "@/hooks/useDashboard";
import { Briefcase, ChevronDown, Link2, Users, Wallet } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/Button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/DropdownMenu";
import StatistiquesCard from "./StatistiquesCard";
import StatistiquesCardSkeleton from "./StatistiquesCardSkeleton";

const PERIOD_OPTIONS = [
	{ value: 1, label: "Ce mois" },
	{ value: 2, label: "Mois passé" },
	{ value: 3, label: "3 derniers mois" },
	{ value: 4, label: "L'année dernière" }
];

const StatistiquesCardWrapper = () => {
	const [selectedPeriod, setSelectedPeriod] = useState(PERIOD_OPTIONS[0].value);
	const [selectedPeriodLabel, setSelectedPeriodLabel] = useState(PERIOD_OPTIONS[0].label);

	const {
		userStats,
		serviceStats,
		plincStats,
		commissionStats,
		isLoading,
		setPeriod
	} = useGlobalStats();

	useGraphStats(selectedPeriod);

	const handlePeriodChange = (value: number, label: string) => {
		setPeriod(value);
		setSelectedPeriodLabel(label);
		setSelectedPeriod(value);
	};

	const cards = [
		{
			data: userStats,
			icon: <Users size={18} />,
			title: "Utilisateurs"
		},
		{
			data: commissionStats,
			icon: <Wallet size={18} />,
			title: "Commissions générées",
			bg_bleu: true,
			dollarIcon: true
		},
		{
			data: serviceStats,
			icon: <Briefcase size={18} />,
			title: "Services actifs"
		},
		{
			data: plincStats,
			icon: <Link2 size={18} />,
			title: "PlinCs terminés",
			bg_bleu: true
		},
	];

	return (
		<div className="flex flex-col">
			<div className="flex justify-between items-center mb-4">
				<h2 className="text-lg font-medium text-neutral-high">Statistiques</h2>

				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="outline" className="h-10 px-4 flex items-center gap-2 border border-neutral-low rounded-full" size="sm">
							<span>{selectedPeriodLabel}</span>
							<ChevronDown className="h-4 w-4 opacity-50" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="w-44">
						{PERIOD_OPTIONS.map((option) => (
							<DropdownMenuItem
								key={option.value}
								onClick={() => handlePeriodChange(option.value, option.label)}
								className={selectedPeriodLabel === option.label ? "bg-primary/10" : ""}
							>
								{option.label}
							</DropdownMenuItem>
						))}
					</DropdownMenuContent>
				</DropdownMenu>
			</div>

			<div className="grid grid-cols-4 gap-4">
				{isLoading ? (
					Array(4).fill(0).map((_, index) => (
						<StatistiquesCardSkeleton key={`skeleton-${index}`} />
					))
				) : (
					cards.map((card, index) => (
						card.data && (
							<StatistiquesCard
								key={`card-${card.title}-${index}`}
								total={card.data.total}
								percentage={card.data.percentage}
								increased={card.data.increased}
								statistiquesCardTitle={card.title}
								icon={card.icon}
								bg_bleu={card.bg_bleu}
								dollarIcon={card.dollarIcon}
							/>
						)
					))
				)}
			</div>
		</div>
	);
};

export default StatistiquesCardWrapper;