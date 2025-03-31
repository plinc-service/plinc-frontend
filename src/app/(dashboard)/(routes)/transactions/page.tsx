"use client";
import TopBar from "@/components/layout/TopBar";
import TransactionHistory from "@/components/transactions/transaction-components/TransactionHistory";
import TransactionWalletCard from "@/components/transactions/transaction-components/TransactionWalletCard";
import TransactionWalletCardSkeleton from "@/components/transactions/transaction-components/TransactionWalletCardSkeleton";
import WithdrawalRequests from "@/components/transactions/withdrall-request/WithdrawalRequests";
import { useTransactionWallet } from "@/hooks/useTransactions";

const TransactionPage = () => {
	const { data, error, loading } = useTransactionWallet();

	return (
		<div className="px-5 pt-5 flex flex-col h-full w-full">
			<TopBar pageName="Transactions" />
			<div className="flex gap-2 w-full h-full">
				{/* Left */}
				<div className="w-2/3 h-full pb-[30px]">
					{
						loading ? (
							<TransactionWalletCardSkeleton />
						) : error ? (
							<div>Error: {error}</div>
						) : (
							<TransactionWalletCard data={data} />
						)
					}
					<div className="mt-5">
						<h3 className="text-sm font-semibold text-neutral-high">
							Historique des transactions
						</h3>

						<div className="mt-5">
							<TransactionHistory />
						</div>
					</div>
				</div>
				{/* Right */}
				<div className="w-1/3 pl-4 border-l border-neutral-low h-full">
					<WithdrawalRequests />
				</div>
			</div>
		</div>
	)
}

export default TransactionPage