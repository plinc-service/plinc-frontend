import { useValidateOrRejectWithdrawal } from "@/hooks/useTransactions";
import { TransactionDetailsPopupProps } from "@/interfaces/transactionInterface";
import {
	X
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogTitle
} from "../../ui/Dialog";
import Spinner from "../../ui/Spinner";
import BankingDetails from "../BankingDetails";
import UserProfilePopup from "../UserProfilePopup";
import RejectWithdrawalReasonPopup from "./RejectWithdrawalReasonPopup";
import WithdrawalActionButtons from "./WithdrawalActionButtons";

const WithdrawalRequestsPopup: React.FC<TransactionDetailsPopupProps> = ({
	open,
	onClose,
	transactionDetails,
	refetchList
}) => {

	const [isUserProfileOpen, setIsUserProfileOpen] = useState(false);
	const [isRejectReason, setIsRejectReason] = useState(false);

	const {
		validateOrRejectWithdrawal,
		loading,
	} = useValidateOrRejectWithdrawal();

	const handleValidate = () => {
		if (transactionDetails?.id) {
			validateOrRejectWithdrawal(
				{
					id: transactionDetails.id,
					status: 1,
				},
				{
					onSuccess: () => {
						refetchList();
						onClose();
					}
				}
			);
		}
	};

	const handleReject = () => {
		if (transactionDetails?.id) {
			setIsRejectReason(true);
		}
	};

	const handleClose = () => {
		onClose();
	};

	const handleOpenUserProfile = () => {
		setIsUserProfileOpen(true);
	};

	const handleCloseUserProfile = () => {
		setIsUserProfileOpen(false);
	};

	const handleCloseRejectReasonPopup = () => {
		setIsRejectReason(false);
	}

	return (
		<>
			<Dialog open={open} onOpenChange={handleClose}>
				<DialogContent className="max-w-[700px] w-full">

					<div className="space-y-3">
						{/* HEADER */}
						<div className="flex justify-between items-center">
							<DialogTitle className="text-lg text-neutral-high font-medium">
								Demande de retrait
							</DialogTitle>
							<button className="hover:text-[#94A3B8] cursor-pointer" onClick={onClose}>
								<X />
							</button>
						</div>
						{transactionDetails ? (
							<div>
								<div className="flex justify-between items-center">
									<div className="flex flex-col items-start">
										<span className="block text-neutral-high">Montant</span>
										<span className="font-semibold block text-primary text-xl">{transactionDetails.amount}€</span>
									</div>
									<span className="block text-neutral-high text-sm">
										Crée le{" "}{new Date(transactionDetails?.created_at).toLocaleDateString("fr-FR", {
											day: "2-digit",
											month: "2-digit",
											year: "numeric"
										})}
									</span>
								</div>

								{/* Buttons for validating or rejecting withdrawal requests */}
								<WithdrawalActionButtons
									onValidate={handleValidate}
									onReject={handleReject}
									loading={loading}
								/>

								{/* Separator */}
								<div className="w-full h-[1px] bg-neutral-low my-4"></div>

								<div className="space-y-2.5">
									<p className="text-primary font-medium">Demande effectué par</p>

									{/* User profile */}
									<div
										className="flex gap-3 items-center cursor-pointer w-fit"
										onClick={handleOpenUserProfile}
										aria-label={`Voir le profil de ${transactionDetails.user.username}`}
									>
										<Image
											src={"https://placehold.co/60x60/png"}
											alt={transactionDetails.user.username}
											width={60}
											height={60}
											className="rounded-full"
										/>
										<div className="flex flex-col justify-start">
											<h3 className="text-lg font-semibold text-blue-600">
												{transactionDetails.user.username}
											</h3>
											<p className="text-neutral-high text-sm">
												{transactionDetails.user.email}
											</p>
										</div>
									</div>

									{/* Informations bancaire */}
									<BankingDetails transactionDetails={transactionDetails.user} />
								</div>
							</div>
						) : (
							<div className="w-full h-full flex justify-center items-center">
								<Spinner />
							</div>
						)}
					</div>
				</DialogContent>
			</Dialog>
			{transactionDetails && (
				<UserProfilePopup
					open={isUserProfileOpen}
					onClose={handleCloseUserProfile}
					transactionDetails={transactionDetails}
					refetchList={refetchList}
				/>
			)}
			<RejectWithdrawalReasonPopup
				open={isRejectReason}
				onClose={handleCloseRejectReasonPopup}
				transactionDetails={transactionDetails}
				refetchList={refetchList}
				closeAllPopups={() => {
					setIsRejectReason(false);
					onClose();
				}}
			/>
		</>
	);
};

export default WithdrawalRequestsPopup;
