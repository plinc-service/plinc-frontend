import { useServicesRequests, SortField, SortOrder } from "@/hooks/useValidations";
import { Service } from "@/interfaces/serviceInterface";
import { useEffect, useState } from "react";
import ServicesRequestsPopup from "../ServicesRequestPopup";
import { ServiceRequestColumns } from "./columns";
import { ServicesRequestsDataTable } from "./ServicesRequestDataTable";

interface ServicesRequestTableWrapperProps {
	searchQuery: string;
	triggerSearch: boolean;
	// Ajout des props de tri avec types corrects
	sortField?: SortField;
	sortOrder?: SortOrder;
}

const ServicesRequestTableWrapper = ({
	searchQuery,
	triggerSearch,
	sortField,
	sortOrder
}: ServicesRequestTableWrapperProps) => {
	const [selectedService, setSelectedService] = useState<Service | null>(null);
	const [isPopupOpen, setIsPopupOpen] = useState(false);

	const {
		data: services,
		refetch,
		setSearchQuery,
		setSortField,
		setSortOrder
	} = useServicesRequests();

	useEffect(() => {
		setSearchQuery(searchQuery);
	}, [searchQuery, setSearchQuery]);

	// Appliquer les changements de tri lorsque les props changent
	useEffect(() => {
		if (sortField && sortOrder) {
			console.log('Updating sort in ServicesRequestTableWrapper:', { sortField, sortOrder });
			setSortField(sortField);
			setSortOrder(sortOrder);
			// Petite pause pour s'assurer que le state est mis à jour
			setTimeout(() => {
				refetch();
			}, 0);
		}
	}, [sortField, sortOrder, setSortField, setSortOrder, refetch]);

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