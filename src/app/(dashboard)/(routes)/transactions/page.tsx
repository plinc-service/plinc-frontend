"use client";
import TopBar from "@/components/layout/TopBar";
import TransactionHistory from "@/components/transactions/TransactionHistory";
import TransactionWalletCard from "@/components/transactions/TransactionWalletCard";
import TransactionWalletCardSkeleton from "@/components/transactions/TransactionWalletCardSkeleton";
import WithdrawalRequests from "@/components/transactions/WithdrawalRequests";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useTransactionWallet } from "@/hooks/useTransactions";
import { AlignCenter, ChevronDown, Search } from "lucide-react";

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
						<div className="flex items-center justify-between mt-5 gap-4">
							<div className="relative flex-1 max-w-[610px]">
								<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-input-placeholder" />
								<Input placeholder="Rechercher" className="pl-9 h-10" />
							</div>
							<Button
								variant="outline"
								className="h-10 px-4 flex items-center gap-2 border border-neutral-low rounded-full"
							>
								<AlignCenter className="h-4 w-4" />
								<span className="text-neutral-high">Trier par</span>
								<ChevronDown className="h-4 w-4 text-neutral-high" />
							</Button>
						</div>

						{/* LISTE DES TRANSACTIONS */}
						<TransactionHistory />
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