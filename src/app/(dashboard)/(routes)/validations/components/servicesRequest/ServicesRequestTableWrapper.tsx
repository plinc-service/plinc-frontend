import { useServicesRequests } from "@/hooks/useValidations";
import { Service } from "@/interfaces/serviceInterface";
import { useState } from "react";
import ServicesRequestsPopup from "../ServicesRequestPopup";
import { ServiceRequestColumns } from "./columns";
import { ServicesRequestsDataTable } from "./ServicesRequestDataTable";

const ServicesRequestTableWrapper = () => {
	const [selectedService, setSelectedService] = useState<Service | null>(null);
	const [isPopupOpen, setIsPopupOpen] = useState(false);

	const {
		data: services,
		refetch: refetch
		// error: withdrawalsError,
		// loading: withdrawalsLoading,
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
			<ServicesRequestsDataTable columns={ServiceRequestColumns} data={services} onClick={(item: Service) => handleServiceClick(item)} />
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