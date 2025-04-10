import { useServicesRequests } from "@/hooks/useValidations";
import { Service } from "@/interfaces/serviceInterface";
import { useEffect, useState } from "react";
import { ServiceRequestColumns } from "./columns";
import { ServicesRequestsDataTable } from "./ServicesRequestDataTable";
import ServicesRequestsPopup from "./ServicesRequestPopup";

interface ServicesRequestTableWrapperProps {
	searchQuery: string;
	triggerSearch: boolean;
}

const ServicesRequestTableWrapper = ({
	searchQuery,
	triggerSearch
}: ServicesRequestTableWrapperProps) => {
	const [selectedService, setSelectedService] = useState<Service | null>(null);
	const [isPopupOpen, setIsPopupOpen] = useState(false);

	const {
		data: services,
		refetch,
		error,
		loading,
		goToNextPage,
		goToPreviousPage,
		goToPage,
		page,
		totalPages,
		setSearchQuery
	} = useServicesRequests(undefined, 0);

	useEffect(() => {
		setSearchQuery(searchQuery);
	}, [searchQuery, setSearchQuery]);

	useEffect(() => {
		if (searchQuery.trim() !== '') {
			refetch();
		}
	}, [triggerSearch, refetch, searchQuery]);

	const handleServiceClick = (service: Service) => {
		setSelectedService(service);
		setIsPopupOpen(true);
	};

	const handleClosePopup = () => {
		setIsPopupOpen(false);
	};

	return (
		<>
			<ServicesRequestsDataTable
				columns={ServiceRequestColumns}
				data={services}
				onClick={(item: Service) => handleServiceClick(item)}
				error={error}
				page={page}
				totalPages={totalPages}
				onNextPage={goToNextPage}
				onPreviousPage={goToPreviousPage}
				onPageChange={goToPage}
				isLoading={loading}
			/>
			<ServicesRequestsPopup
				open={isPopupOpen}
				onClose={handleClosePopup}
				refetchList={refetch}
				service_id={selectedService?.id}
			/>
		</>
	)
}

export default ServicesRequestTableWrapper