import { useWithdrawalRequests } from "@/hooks/useTransactions";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ScrollArea } from "../ui/ScrollArea";

const WithdrawalRequests = () => {

	const {
		data: withdrawals,
		error: withdrawalsError,
		loading: withdrawalsLoading,
	} = useWithdrawalRequests();

	return (
		<div>
			<div className="flex justify-between items-center py-3">
				<h3 className="text-base font-semibold text-neutral-high">
					Demandes de retrait
				</h3>
				<Link className="text-primary text-base" href="#">Tout voir</Link>
			</div>
			<ScrollArea className="h-[600px] xxl:h-[767px] 2xl:h-[1040px]">
				{withdrawalsLoading ? (
					<p>Chargement des retraits...</p>
				) : withdrawalsError ? (
					<p className="text-red-500">{withdrawalsError}</p>
				) : (
					<ul className="space-y-2">
						{withdrawals.length > 0 ? (
							withdrawals.map((withdrawal) => (
								<li key={withdrawal.id} className="border-b border-neutral-low px-1 pt-1 pb-2.5 mb-2.5 space-y-3 hover:bg-brand-lowest transition-colors cursor-pointer">
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
		</div>
	)
}

export default WithdrawalRequests