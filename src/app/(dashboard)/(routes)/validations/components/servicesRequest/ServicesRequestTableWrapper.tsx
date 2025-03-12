import { useServicesRequests } from "@/hooks/useValidations";
import { Service } from "@/interfaces/serviceInterface";
import { useEffect, useState } from "react";
import ServicesRequestsPopup from "../ServicesRequestPopup";
import { ServiceRequestColumns } from "./columns";
import { ServicesRequestsDataTable } from "./ServicesRequestDataTable";

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
		setSearchQuery
	} = useServicesRequests();

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
				isLoading={loading}
			/>
			<ServicesRequestsPopup
				open={isPopupOpen}
				onClose={handleClosePopup}
				refetchList={refetch}
				servicesDetails={selectedService}
			/>
		</>
	)
}

export default ServicesRequestTableWrapper