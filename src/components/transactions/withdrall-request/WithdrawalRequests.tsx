import Spinner from "@/components/ui/Spinner";
import { useWithdrawalRequests } from "@/hooks/useTransactions";
import { Transaction } from "@/interfaces/transactionInterface";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { WithdrawalFilter } from "./WithdrawalFilter";
import WithdrawalRequestsPopup from "./WithdrawalRequestsPopup";
;

const WithdrawalRequests = () => {
	const [selectedWithdrawal, setSelectedWithdrawal] = useState<Transaction | null>(null);
	const [isPopupOpen, setIsPopupOpen] = useState(false);

	const {
		data: withdrawals,
		error: withdrawalsError,
		refetch,
		loading: withdrawalsLoading,
		searchQuery,
		setSearchQuery
	} = useWithdrawalRequests();

	const handleWithdrawalClick = (withdrawal: Transaction) => {
		setSelectedWithdrawal(withdrawal);
		setIsPopupOpen(true);
	};

	const handleClosePopup = () => {
		setIsPopupOpen(false);
	};

	return (
		<div>
			<div className="flex justify-between items-center py-3">
				<h3 className="text-base font-semibold text-neutral-high">
					Demandes de retrait
				</h3>
				<Link className="text-primary text-base" href="/validations">Tout voir</Link>
			</div>

			{/* Ajout du filtre de recherche */}
			<div className="mb-4">
				<WithdrawalFilter
					searchQuery={searchQuery}
					setSearchQuery={setSearchQuery}
				/>
			</div>

			<ScrollArea className="h-[600px] xxl:h-[767px] 2xl:h-[940px]">
				{withdrawalsLoading ? (
					<div className="flex justify-center items-center h-[600px] xxl:h-[767px] 2xl:h-[1040px]">
						<Spinner />
					</div>
				) : withdrawalsError ? (
					<p className="text-red-500">{withdrawalsError}</p>
				) : (
					<ul className="space-y-2">
						{withdrawals.length > 0 ? (
							withdrawals.map((withdrawal) => (
								<li key={withdrawal.id} className="border-b border-neutral-low px-1 pt-1 pb-2.5 mb-2.5 space-y-3 hover:bg-brand-lowest transition-colors cursor-pointer" onClick={() => handleWithdrawalClick(withdrawal)}>
									<div className="flex justify-between items-start">
										<div className="flex gap-3">
											<Image
												src={"https://placehold.co/50x50/png"}
												alt={withdrawal.user.username}
												width={48}
												height={48}
												className="rounded-full"
											/>
											<div className="flex flex-col justify-start">
												<h3 className="text-sm font-semibold text-blue-600">
													{withdrawal.user.username}
												</h3>
												<p className="text-neutral-high text-xs">
													{withdrawal.user.email}
												</p>
											</div>
										</div>
										<span className="text-sm text-primary">{withdrawal.amount}</span>
									</div>
									<div className="flex justify-between items-center w-full">
										<span className="text-neutral-high text-sm">
											{(() => {
												const date = new Date(withdrawal.created_at).toLocaleDateString("fr-FR", {
													weekday: "long",
													day: "2-digit",
													month: "long",
												});

												const time = new Date(withdrawal.created_at).toLocaleTimeString("fr-FR", {
													hour: "2-digit",
													minute: "2-digit",
													hour12: false,
												});

												const formattedDate = date.replace(/\b\w/g, (c) => c.toUpperCase());

												return `${formattedDate} à ${time}`;
											})()}
										</span>
										<ChevronRight size={16} />
									</div>
								</li>
							))
						) : (
							<p>Aucune demande de retrait trouvée.</p>
						)}
					</ul>
				)}
			</ScrollArea>

			<WithdrawalRequestsPopup
				open={isPopupOpen}
				onClose={handleClosePopup}
				refetchList={refetch}
				transactionDetails={selectedWithdrawal}
			/>
		</div>
	)
}

export default WithdrawalRequests