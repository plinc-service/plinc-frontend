import WithdrawalRequestsPopup from "@/components/transactions/WithdrawalRequestsPopup";
import { useWithdrawalRequests } from "@/hooks/useTransactions";
import { Transaction } from "@/interfaces/transactionInterface";
import { useEffect, useState } from "react";
import { columns } from "./columns";
import { WithdrawalRequestsDataTable } from "./WithdrawRequestDataTable";

interface WithdrawRequestTableWrapperProps {
	searchQuery: string;
}

const WithdrawRequestTableWrapper = ({
	searchQuery,
}: WithdrawRequestTableWrapperProps) => {
	const [selectedWithdrawal, setSelectedWithdrawal] = useState<Transaction | null>(null);
	const [isPopupOpen, setIsPopupOpen] = useState(false);

	const {
		data: withdrawal,
		refetch,
		setSearchQuery,
	} = useWithdrawalRequests();

	useEffect(() => {
		setSearchQuery(searchQuery);
	}, [searchQuery, setSearchQuery]);

	useEffect(() => {
		if (searchQuery.trim() !== '') {
			refetch();
		}
	}, [refetch, searchQuery]);

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