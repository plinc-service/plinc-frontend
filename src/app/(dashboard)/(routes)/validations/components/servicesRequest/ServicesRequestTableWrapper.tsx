import { useServicesRequests } from "@/hooks/useValidations";
import { Service } from "@/interfaces/serviceInterface";
import { useEffect, useState } from "react";
import ServicesRequestsPopup from "../ServicesRequestPopup";
import { ServiceRequestColumns } from "./columns";
import { ServicesRequestsDataTable } from "./ServicesRequestDataTable";

interface ServicesRequestTableWrapperProps {
	searchQuery: string;
}

const ServicesRequestTableWrapper = ({
	searchQuery,
}: ServicesRequestTableWrapperProps) => {
	const [selectedService, setSelectedService] = useState<Service | null>(null);
	const [isPopupOpen, setIsPopupOpen] = useState(false);

	const {
		data: services,
		refetch,
		setSearchQuery,
	} = useServicesRequests();

	useEffect(() => {
		setSearchQuery(searchQuery);
	}, [searchQuery, setSearchQuery]);

	useEffect(() => {
		if (searchQuery.trim() !== '') {
			refetch();
		}
	}, [refetch, searchQuery]);

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
				onRowClick={handleServiceClick}
			/>
			{selectedService && (
				<ServicesRequestsPopup
					open={isPopupOpen}
					onClose={handleClosePopup}
					servicesDetails={selectedService}
					refetchList={refetch}
				/>
			)}
		</>
	);
};

export default ServicesRequestTableWrapper;