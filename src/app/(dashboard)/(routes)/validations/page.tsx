"use client";
import TopBar from "@/components/layout/TopBar";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { AlignCenter, ChevronDown, ChevronsUpDown, Search } from "lucide-react";
import { useState } from "react";
import ServicesRequestTableWrapper from "./components/servicesRequest/ServicesRequestTableWrapper";
import WithdrawRequestTableWrapper from "./components/withdrawRequest/WithdrawRequestTableWrapper";

const ValidationPage = () => {
	const [activeTab, setActiveTab] = useState("WithdrawalRequests");

	const [withdrawalSearch, setWithdrawalSearch] = useState("");
	const [serviceSearch, setServiceSearch] = useState("");

	const [triggerWithdrawalSearch, setTriggerWithdrawalSearch] = useState(false);
	const [triggerServiceSearch, setTriggerServiceSearch] = useState(false);

	const handleTabChange = (value: string) => {
		setActiveTab(value);
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, tabType: string) => {
		if (e.key === 'Enter') {
			if (tabType === 'withdrawal') {
				setTriggerWithdrawalSearch(prev => !prev);
			} else if (tabType === 'service') {
				setTriggerServiceSearch(prev => !prev);
			}
		}
	};

	const renderFilters = () => {
		if (activeTab === "WithdrawalRequests") {
			return (
				<>
					<div className="relative flex-1 max-w-[610px]">
						<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-input-placeholder" />
						<Input
							placeholder="Rechercher une demande de retrait"
							className="pl-9 h-10"
							value={withdrawalSearch}
							onChange={(e) => setWithdrawalSearch(e.target.value)}
							onKeyDown={(e) => handleKeyDown(e, 'withdrawal')}
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
				</>
			);
		} else if (activeTab === "Services") {
			return (
				<>
					<div className="relative flex-1 max-w-[610px]">
						<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-input-placeholder" />
						<Input
							placeholder="Rechercher un service"
							className="pl-9 h-10"
							value={serviceSearch}
							onChange={(e) => setServiceSearch(e.target.value)}
							onKeyDown={(e) => handleKeyDown(e, 'service')}
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
				</>
			);
		}
		return null;
	};

	return (
		<div className="px-5 pt-5 flex flex-col h-full w-full">
			<TopBar pageName="Validations" />
			<div className="w-full h-full mt-4">
				<Tabs
					defaultValue="WithdrawalRequests"
					className="w-full"
					onValueChange={handleTabChange}
					value={activeTab}
				>
					<div className="flex justify-between items-center">
						<TabsList>
							<TabsTrigger value="WithdrawalRequests" className="cursor-pointer text-neutral-high">
								Demandes de retraits
							</TabsTrigger>
							<TabsTrigger value="Services" className="cursor-pointer text-neutral-high">
								Services
							</TabsTrigger>
						</TabsList>

						{/* Zone des filtres qui change selon l'onglet actif */}
						<div className="inline-flex items-center gap-2">
							{renderFilters()}
						</div>
					</div>

					{activeTab === "WithdrawalRequests" && (
						<WithdrawalRequestsContent
							key="withdrawals"
							searchQuery={withdrawalSearch}
							triggerSearch={triggerWithdrawalSearch}
						/>
					)}

					{activeTab === "Services" && (
						<ServicesContent
							key="services"
							searchQuery={serviceSearch}
							triggerSearch={triggerServiceSearch}
						/>
					)}
				</Tabs>
			</div>
		</div>
	);
};

const WithdrawalRequestsContent = ({
	searchQuery,
	triggerSearch
}: {
	searchQuery: string;
	triggerSearch: boolean
}) => {
	return (
		<div className="mt-4">
			<WithdrawRequestTableWrapper searchQuery={searchQuery} triggerSearch={triggerSearch} />
		</div>
	);
};

const ServicesContent = ({
	searchQuery,
	triggerSearch
}: {
	searchQuery: string;
	triggerSearch: boolean
}) => {
	return (
		<div className="mt-4">
			<ServicesRequestTableWrapper searchQuery={searchQuery} triggerSearch={triggerSearch} />
		</div>
	);
};

export default ValidationPage;