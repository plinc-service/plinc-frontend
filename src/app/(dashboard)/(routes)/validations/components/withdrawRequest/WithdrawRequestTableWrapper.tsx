import WithdrawalRequestsPopup from "@/components/transactions/withdrall-request/WithdrawalRequestsPopup";
import { SortOrder, useWithdrawalRequests } from "@/hooks/useTransactions";
import { Transaction } from "@/interfaces/transactionInterface";
import { useEffect, useState } from "react";
import { columns } from "./columns";
import { WithdrawalRequestsDataTable } from "./WithdrawRequestDataTable";

interface WithdrawRequestTableWrapperProps {
	searchQuery: string;
	order: string;
	triggerSearch: boolean;
}

const WithdrawRequestTableWrapper = ({
	searchQuery,
	order,
	triggerSearch
}: WithdrawRequestTableWrapperProps) => {
	const [selectedWithdrawal, setSelectedWithdrawal] = useState<Transaction | null>(null);
	const [isPopupOpen, setIsPopupOpen] = useState(false);

	const {
		data: withdrawal,
		refetch,
		error,
		loading,
		setSearchQuery,
		setSortOrder,
		goToNextPage,
		goToPage,
		goToPreviousPage,
		page,
		totalPages
	} = useWithdrawalRequests();

	useEffect(() => {
		setSearchQuery(searchQuery);
	}, [searchQuery, setSearchQuery]);

	useEffect(() => {
		if (searchQuery.trim() !== '') {
			refetch();
		}
	}, [triggerSearch, refetch, searchQuery]);

	useEffect(() => {
		setSortOrder(order as SortOrder);
	}, [order, setSortOrder]);

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
				onClick={(item: Transaction) => handleWithdrawalClick(item)}
				error={error}
				isLoading={loading}
				page={page}
				totalPages={totalPages}
				onNextPage={goToNextPage}
				onPreviousPage={goToPreviousPage}
				onPageChange={goToPage}
			/>


			<WithdrawalRequestsPopup
				open={isPopupOpen}
				onClose={handleClosePopup}
				refetchList={refetch}
				transactionDetails={selectedWithdrawal}
			/>
		</>
	)
}

export default WithdrawRequestTableWrapper