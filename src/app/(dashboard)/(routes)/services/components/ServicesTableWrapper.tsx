"use client";

import { useServicesRequests } from "@/hooks/useValidations";
import { Service } from "@/interfaces/serviceInterface";
import { useState } from "react";
import { ServicesColumns } from "./columns";
import { ServicesDataTable } from "./ServicesDataTable";
import ServicesDetailsPopup from "./ServicesDetailsPopup";
import { StatutDataTableFilter } from "./ServiceTableFilter";

const ServicesTableWrapper = () => {
	const [selectedService, setSelectedService] = useState<Service | null>(null);
	const [isPopupOpen, setIsPopupOpen] = useState(false);

	const {
		data: services,
		refetch,
		error,
		loading,
		selectedStatus,
		setSelectedStatus,
		searchQuery,
		setSearchQuery,
		sortField,
		setSortField,
		sortOrder,
		setSortOrder
	} = useServicesRequests();

	const handleServiceClick = (service: Service) => {
		setSelectedService(service);
		setIsPopupOpen(true);
	};

	const handleClosePopup = () => {
		setIsPopupOpen(false);
	};
	

	return (
		<>
			{/* Filter */}
			<StatutDataTableFilter
				selectedStatus={selectedStatus}
				setSelectedStatus={setSelectedStatus}
				searchQuery={searchQuery}
				setSearchQuery={setSearchQuery}
				sortField={sortField}
				setSortField={setSortField}
				sortOrder={sortOrder}
				setSortOrder={setSortOrder}
				refetch={refetch} />

			{/* Services Data Table */}
			<ServicesDataTable columns={ServicesColumns} data={services} onClick={(item: Service) => handleServiceClick(item)} error={error} isLoading={loading} />

			{/* Services Popup */}
			<ServicesDetailsPopup
				open={isPopupOpen}
				onClose={handleClosePopup}
				refetchList={refetch}
				servicesDetails={selectedService}
			/>
		</>
	)
}

export default ServicesTableWrapper