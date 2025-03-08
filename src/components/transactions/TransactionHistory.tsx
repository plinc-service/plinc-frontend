import { Transaction } from "@/interfaces/transactionInterface";
import { useTransactionHistory } from "@/hooks/useTransactions";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { ScrollArea, ScrollBar } from "../ui/ScrollArea";
import Spinner from "../ui/Spinner";
import { TransactionFilter } from "./TransactionFilter";

interface TransactionHistoryProps {
  showFilter?: boolean;
}

const TransactionHistory = ({ showFilter = true }: TransactionHistoryProps) => {
	const {
		transactions,
		loading,
		error,
		searchQuery,
		setSearchQuery,
		sortField,
		setSortField,
		sortOrder,
		setSortOrder,
		transactionType,
		setTransactionType,
		refetch
	} = useTransactionHistory();

	if (loading) {
		return (
			<div className="mt-4 h-[390px] xxl:h-[570px] 2xl:h-[842px] flex justify-center items-center">
				<Spinner />
			</div>
		);
	}

	if (error) {
		return (
			<div className="mt-4 h-[390px] xxl:h-[570px] 2xl:h-[842px] flex justify-center items-center">
				<p className="text-sm text-danger">{error}</p>
			</div>
		);
	}

	if (!transactions.length) {
		return (
			<div className="mt-4 h-[390px] xxl:h-[570px] 2xl:h-[842px] flex justify-center items-center">
				<p className="text-sm text-neutral-medium">Aucune donnée pour le moment.</p>
			</div>
		);
	}

	return (
		<div className="space-y-4">
			{showFilter && (
				<TransactionFilter
					searchQuery={searchQuery}
					setSearchQuery={setSearchQuery}
					sortField={sortField}
					setSortField={setSortField}
					sortOrder={sortOrder}
					setSortOrder={setSortOrder}
					transactionType={transactionType}
					setTransactionType={setTransactionType}
					refetch={refetch}
				/>
			)}
			
			<div className="mt-4 space-y-[18px] text-center">
				<ScrollArea className="h-[390px] xxl:h-[570px] 2xl:h-[842px]">
					{transactions.map((transaction) => (
						<div
							key={transaction.id}
							className="flex flex-col items-start justify-between gap-2.5 h-[85px] border-b border-neutral-low pb-[18px] mb-[18px]"
						>
							<div className="flex items-center w-full justify-between">
								<div className="flex items-center gap-2">
									<span
										className={`${transaction.type === "retrait"
											? "bg-danger-background border-danger-border"
											: "bg-success-background border-success-border"
											} border rounded-full w-7 h-7 flex items-center justify-center`}
									>
										{transaction.type === "retrait" ? (
											<ArrowUpRight className="text-danger" size={16} />
										) : (
											<ArrowDownRight className="text-success" size={16} />
										)}
									</span>
									<div className="text-left min-w-0 flex-1">
										<h5 className="text-base font-semibold text-neutral-high">
											{transaction.type === "retrait" ? "Retrait" : "Payement PlinC"}
										</h5>
										<p className="text-sm text-neutral-high truncate max-w-[600px]">
											{transaction.user.services?.[0]?.description || "Aucune description"}
										</p>
									</div>
								</div>
								<span
									className={`${transaction.type === "retrait" ? "text-danger" : "text-success"
										} block text-base`}
								>
									{transaction.type === "retrait" ? "-" : "+"}
									{transaction.amount}€
								</span>
							</div>
							<span className="text-neutral-high text-sm">
								{(() => {
									const date = new Date(transaction.created_at).toLocaleDateString("fr-FR", {
										weekday: "long",
										day: "2-digit",
										month: "long",
									});

									const time = new Date(transaction.created_at).toLocaleTimeString("fr-FR", {
										hour: "2-digit",
										minute: "2-digit",
										hour12: false,
									});

									const formattedDate = date.replace(/\b\w/g, (c) => c.toUpperCase());

									return `${formattedDate} à ${time}`;
								})()}
							</span>
						</div>
					))}
					<ScrollBar orientation="vertical" />
				</ScrollArea>
			</div>
		</div>
	);
};

export default TransactionHistory;
