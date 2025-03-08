"use client";
import TopBar from "@/components/layout/TopBar";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { AlignCenter, ChevronDown, ChevronsUpDown, Search } from "lucide-react";
import { useState } from "react";
import ServicesRequestTableWrapper from "./components/servicesRequest/ServicesRequestTableWrapper";
import WithdrawRequestTableWrapper from "./components/withdrawRequest/WithdrawRequestTableWrapper";
import { ServiceFilter, WithdrawalFilter } from "./components/FilterComponents";
import { useServicesRequests, SortField } from "@/hooks/useValidations";
import { useWithdrawalRequests, TransactionSortField, SortOrder } from "@/hooks/useTransactions";

const ValidationPage = () => {
	const [activeTab, setActiveTab] = useState("WithdrawalRequests");

	const [withdrawalSearch, setWithdrawalSearch] = useState("");
	const [serviceSearch, setServiceSearch] = useState("");

	const [triggerWithdrawalSearch, setTriggerWithdrawalSearch] = useState(false);
	const [triggerServiceSearch, setTriggerServiceSearch] = useState(false);

	// Hooks pour la gestion du tri
	const {
		sortField: withdrawalSortField,
		setSortField: setWithdrawalSortField,
		sortOrder: withdrawalSortOrder,
		setSortOrder: setWithdrawalSortOrder,
		refetch: refetchWithdrawals
	} = useWithdrawalRequests();

	const {
		sortField: serviceSortField,
		setSortField: setServiceSortField,
		sortOrder: serviceSortOrder,
		setSortOrder: setServiceSortOrder,
		refetch: refetchServices
	} = useServicesRequests();

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

	const renderSearch = () => {
		if (activeTab === "WithdrawalRequests") {
			return (
				<div className="relative">
					<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-input-placeholder" />
					<Input
						placeholder="Rechercher une demande de retrait"
						className="pl-9 h-10"
						value={withdrawalSearch}
						onChange={(e) => setWithdrawalSearch(e.target.value)}
						onKeyDown={(e) => handleKeyDown(e, 'withdrawal')}
					/>
				</div>
			);
		} else if (activeTab === "Services") {
			return (
				<div className="relative">
					<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-input-placeholder" />
					<Input
						placeholder="Rechercher un service"
						className="pl-9 h-10"
						value={serviceSearch}
						onChange={(e) => setServiceSearch(e.target.value)}
						onKeyDown={(e) => handleKeyDown(e, 'service')}
					/>
				</div>
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
						<div className="flex items-center gap-2">
							<TabsList>
								<TabsTrigger value="WithdrawalRequests" className="cursor-pointer text-neutral-high">
									Demandes de retraits
								</TabsTrigger>
								<TabsTrigger value="Services" className="cursor-pointer text-neutral-high">
									Services
								</TabsTrigger>
							</TabsList>
						</div>

						{/* Zone des filtres qui change selon l'onglet actif */}
						<div className="inline-flex items-center gap-2">
							{renderSearch()}
							{activeTab === "WithdrawalRequests" && (
								<WithdrawalFilter 
									sortField={withdrawalSortField}
									setSortField={setWithdrawalSortField}
									sortOrder={withdrawalSortOrder}
									setSortOrder={setWithdrawalSortOrder}
									refetch={refetchWithdrawals}
								/>
							)}
							{activeTab === "Services" && (
								<ServiceFilter 
									sortField={serviceSortField}
									setSortField={setServiceSortField}
									sortOrder={serviceSortOrder}
									setSortOrder={setServiceSortOrder}
									refetch={refetchServices}
								/>
							)}
						</div>
					</div>

					{activeTab === "WithdrawalRequests" && (
						<WithdrawalRequestsContent
							key="withdrawals"
							searchQuery={withdrawalSearch}
							triggerSearch={triggerWithdrawalSearch}
							sortField={withdrawalSortField}
							sortOrder={withdrawalSortOrder}
						/>
					)}

					{activeTab === "Services" && (
						<ServicesContent
							key="services"
							searchQuery={serviceSearch}
							triggerSearch={triggerServiceSearch}
							sortField={serviceSortField}
							sortOrder={serviceSortOrder}
						/>
					)}
				</Tabs>
			</div>
		</div>
	);
};

interface ContentProps {
	searchQuery: string;
	triggerSearch: boolean;
}

interface WithdrawalContentProps extends ContentProps {
	sortField: TransactionSortField;
	sortOrder: SortOrder;
}

interface ServiceContentProps extends ContentProps {
	sortField: SortField;
	sortOrder: SortOrder;
}

const WithdrawalRequestsContent = ({
	searchQuery,
	triggerSearch,
	sortField,
	sortOrder
}: WithdrawalContentProps) => {
	return (
		<div className="w-full mt-6">
			<WithdrawRequestTableWrapper
				searchQuery={searchQuery}
				triggerSearch={triggerSearch}
				sortField={sortField}
				sortOrder={sortOrder}
			/>
		</div>
	);
};

const ServicesContent = ({
	searchQuery,
	triggerSearch,
	sortField,
	sortOrder
}: ServiceContentProps) => {
	return (
		<div className="w-full mt-6">
			<ServicesRequestTableWrapper
				searchQuery={searchQuery}
				triggerSearch={triggerSearch}
				sortField={sortField}
				sortOrder={sortOrder}
			/>
		</div>
	);
};

export default ValidationPage;