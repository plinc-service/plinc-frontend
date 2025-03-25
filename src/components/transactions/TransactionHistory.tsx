import { useTransactionHistory } from "@/hooks/useTransactions";
import { Transaction } from "@/interfaces/transactionInterface";
import { FormattedDate } from "@/utils/formatDate";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { memo } from "react";
import { ScrollArea, ScrollBar } from "../ui/ScrollArea";
import Spinner from "../ui/Spinner";
import { TransactionFilter } from "./TransactionFilter";

interface ErrorStateProps {
	error: string;
}

interface TransactionItemProps {
	transaction: Transaction;
}

const LoadingState = () => (
	<div className="flex-1 flex justify-center items-center">
		<Spinner />
	</div>
);

const ErrorState: React.FC<ErrorStateProps> = ({ error }) => (
	<p className="text-sm text-danger">{error}</p>
);

const EmptyState = () => (
	<div className="flex-1 flex justify-center items-center">
		<p className="text-sm text-neutral-medium">Aucune donnée pour le moment.</p>
	</div>
);

const TransactionItem: React.FC<TransactionItemProps> = memo(({ transaction }) => {
	const isWithdrawal = transaction.type === "retrait";
	const iconColorClass = isWithdrawal
		? "bg-danger-background border-danger-border"
		: "bg-success-background border-success-border";
	const amountColorClass = isWithdrawal ? "text-danger" : "text-success";

	return (
		<div
			className="flex flex-col items-start justify-between gap-2.5 h-[85px] border-b border-neutral-low pb-[18px] mb-[18px]"
		>
			<div className="flex items-center w-full justify-between">
				<div className="flex items-center gap-2">
					<span
						className={`${iconColorClass} border rounded-full w-7 h-7 flex items-center justify-center`}
					>
						{isWithdrawal ? (
							<ArrowUpRight className="text-danger" size={16} />
						) : (
							<ArrowDownRight className="text-success" size={16} />
						)}
					</span>
					<div className="text-left min-w-0 flex-1">
						<h5 className="text-base font-semibold text-neutral-high">
							{isWithdrawal ? "Retrait" : "Payement"}
						</h5>
						<p className="text-sm text-neutral-high truncate max-w-[600px]">
							{transaction.user.services?.[0]?.description || "Aucune description"}
						</p>
					</div>
				</div>
				<span className={`${amountColorClass} block text-base`}>
					{isWithdrawal ? "-" : "+"}
					{transaction.amount}€
				</span>
			</div>
			<span className="text-neutral-high text-sm">
				<FormattedDate dateString={transaction.created_at} />
			</span>
		</div>
	);
});

TransactionItem.displayName = "TransactionItem";
const TransactionHistory: React.FC = () => {
	const {
		transactions,
		loading,
		error,
		searchQuery,
		setSearchQuery,
		selectedFilter,
		setSelectedFilter,
		refetch,
	} = useTransactionHistory();

	return (
		<div className="space-y-4">
			<TransactionFilter
				searchQuery={searchQuery}
				setSearchQuery={setSearchQuery}
				selectedFilter={selectedFilter}
				setSelectedFilter={setSelectedFilter}
				refetch={refetch}
			/>

			<div className="mt-4 space-y-[18px] text-center">
				<ScrollArea className="h-[390px] xxl:h-[570px] 2xl:h-[742px]">
					{loading ? (
						<LoadingState />
					) : error ? (
						<ErrorState error={error} />
					) : transactions.length === 0 ? (
						<EmptyState />
					) : (
						transactions.map((transaction) => (
							<TransactionItem
								key={transaction.id}
								transaction={transaction}
							/>
						))
					)}
					<ScrollBar orientation="vertical" />
				</ScrollArea>
			</div>
		</div>
	);
};

TransactionHistory.displayName = "TransactionHistory";

export default TransactionHistory;