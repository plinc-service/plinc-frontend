import WithdrawalRequestsPopup from "@/components/transactions/WithdrawalRequestsPopup";
import { useWithdrawalRequests, TransactionSortField, SortOrder } from "@/hooks/useTransactions";
import { Transaction } from "@/interfaces/transactionInterface";
import { useEffect, useState } from "react";
import { columns } from "./columns";
import { WithdrawalRequestsDataTable } from "./WithdrawRequestDataTable";

interface WithdrawRequestTableWrapperProps {
	searchQuery: string;
	triggerSearch: boolean;
	// Ajout des props de tri avec types corrects
	sortField?: TransactionSortField;
	sortOrder?: SortOrder;
}

const WithdrawRequestTableWrapper = ({
	searchQuery,
	triggerSearch,
	sortField,
	sortOrder
}: WithdrawRequestTableWrapperProps) => {
	const [selectedWithdrawal, setSelectedWithdrawal] = useState<Transaction | null>(null);
	const [isPopupOpen, setIsPopupOpen] = useState(false);

	const {
		data: withdrawal,
		refetch,
		error,
		loading,
		setSearchQuery,
		sortField: currentSortField,
		sortOrder: currentSortOrder,
		setSortField,
		setSortOrder
	} = useWithdrawalRequests();

	useEffect(() => {
		setSearchQuery(searchQuery);
	}, [searchQuery, setSearchQuery]);

	// Appliquer les changements de tri lorsque les props changent
	useEffect(() => {
		if (sortField && sortOrder) {
			console.log('Updating sort in WithdrawRequestTableWrapper:', { sortField, sortOrder });
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

	const handleWithdrawalClick = (withdrawal: Transaction) => {
		setSelectedWithdrawal(withdrawal);
		setIsPopupOpen(true);
	};

	const handleClosePopup = () => {
		setIsPopupOpen(false);
	};

	return (
		<>
			<WithdrawalRequestsDataTable
				columns={columns}
				data={withdrawal}
				onRowClick={handleWithdrawalClick}
			/>
			{selectedWithdrawal && (
				<WithdrawalRequestsPopup
					open={isPopupOpen}
					onClose={handleClosePopup}
					transactionDetails={selectedWithdrawal}
					refetchList={refetch}
				/>
			)}
		</>
	);
};

export default WithdrawRequestTableWrapper;