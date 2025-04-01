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
		goToNextPage,
		goToPreviousPage,
		goToPage,
		page,
		totalPages,
		sortField,
		handleSort,
	} = useServicesRequests(1);

	const handleServiceClick = (service: Service) => {
		setSelectedService(service);
		setIsPopupOpen(true);
	};

	const handleClosePopup = () => {
		setIsPopupOpen(false);
	};


	return (
		<>
			<StatutDataTableFilter
				selectedStatus={selectedStatus}
				setSelectedStatus={setSelectedStatus}
				searchQuery={searchQuery}
				setSearchQuery={setSearchQuery}
				sortField={sortField}
				handleSort={handleSort}
			/>

			<ServicesDataTable
				columns={ServicesColumns}
				data={services}
				onClick={(item: Service) => handleServiceClick(item)}
				error={error}
				isLoading={loading}
				page={page}
				totalPages={totalPages}
				onNextPage={goToNextPage}
				onPreviousPage={goToPreviousPage}
				onPageChange={goToPage} />

			<ServicesDetailsPopup
				open={isPopupOpen}
				onClose={handleClosePopup}
				refetchList={refetch}
				service_id={selectedService?.id}
			/>
		</>
	)
}

export default ServicesTableWrapper