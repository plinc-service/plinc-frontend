import WithdrawalRequestsPopup from "@/components/transactions/WithdrawalRequestsPopup";
import { useWithdrawalRequests } from "@/hooks/useTransactions";
import { Transaction } from "@/interfaces/transactionInterface";
import { useState } from "react";
import { columns } from "./columns";
import { WithdrawalRequestsDataTable } from "./WithdrawRequestDataTable";

const WithdrawRequestTableWrapper = () => {
	const [selectedWithdrawal, setSelectedWithdrawal] = useState<Transaction | null>(null);
	const [isPopupOpen, setIsPopupOpen] = useState(false);

	const {
		data: withdrawal,
		refetch: refetch
		// error: withdrawalsError,
		// loading: withdrawalsLoading,
	} = useWithdrawalRequests();

	const handleWithdrawalClick = (withdrawal: Transaction) => {
		setSelectedWithdrawal(withdrawal);
		setIsPopupOpen(true);
	};

	const handleClosePopup = () => {
		setIsPopupOpen(false);
	};

	return (
		<>
			<WithdrawalRequestsDataTable columns={columns} data={withdrawal} onClick={(item: Transaction) => handleWithdrawalClick(item)} />
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