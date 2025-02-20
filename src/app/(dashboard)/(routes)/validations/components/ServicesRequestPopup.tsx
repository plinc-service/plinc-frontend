import WithdrawalActionButtons from "@/components/transactions/WithdrawalActionButtons";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/Dialog";
import Spinner from "@/components/ui/Spinner";
import { useValidateOrRejectWithdrawal } from "@/hooks/useTransactions";
import { ServicesRequestDetailsPopupProps } from "@/interfaces/serviceInterface";
import {
	X
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import UserProfilePopup from "./UserProfilePopup";

const ServicesRequestsPopup: React.FC<ServicesRequestDetailsPopupProps> = ({
	open,
	onClose,
	servicesDetails,
	refetchList
}) => {

	const [localError, setLocalError] = useState<string | null>(null);
	const [isUserProfileOpen, setIsUserProfileOpen] = useState(false);

	const {
		validateOrRejectWithdrawal,
		loading,
		error,
	} = useValidateOrRejectWithdrawal(() => {
		refetchList();
		onClose();
	});

	useEffect(() => {
		if (error) {
			setLocalError(error);
		}
	}, [error]);

	useEffect(() => {
		if (!open) {
			setLocalError(null);
		}
	}, [open]);

	const handleValidate = () => {
		if (servicesDetails?.id) {
			validateOrRejectWithdrawal({
				id: servicesDetails.id.toString(),
				status: 1
			});
		}
	};

	const handleReject = () => {
		if (servicesDetails?.id) {
			validateOrRejectWithdrawal({
				id: servicesDetails.id.toString(),
				status: 2
			});
		}
	};

	const handleClose = () => {
		setLocalError(null);
		onClose();
	};

	const handleOpenUserProfile = () => {
		setIsUserProfileOpen(true);
	};

	const handleCloseUserProfile = () => {
		setIsUserProfileOpen(false);
	};

	return (
		<>
			<Dialog open={open} onOpenChange={handleClose}>
				<DialogContent className="max-w-[700px] w-full">
					{localError && (
						<div className="bg-red-50 text-red-600 p-3 rounded-md">
							{error}
						</div>
					)}

					<div className="space-y-3">
						{/* HEADER */}
						{servicesDetails ? (
							<>
								<div className="flex justify-between items-center">
									<DialogTitle className="text-lg text-neutral-high font-medium">
										Services {servicesDetails.id}
									</DialogTitle>
									<button className="hover:text-[#94A3B8] cursor-pointer" onClick={onClose}>
										<X />
									</button>
								</div>
								<div>
									<div className="flex justify-between items-center">
										<span className="font-semibold block text-primary text-xl">{servicesDetails.name}</span>
										<span className="block text-neutral-high text-sm">
											Crée le{" "}{new Date(servicesDetails?.created_at).toLocaleDateString("fr-FR", {
												day: "2-digit",
												month: "2-digit",
												year: "numeric"
											})}
										</span>
									</div>

									<div className="space-y-1 mt-2">
										<span className="block text-lg font-medium text-neutral-high">{servicesDetails.category}</span>
										<p className="text-neutral-high text-lg">{servicesDetails.description || "Pas de description"}</p>
									</div>

									{/* Buttons for validating or rejecting withdrawal requests */}
									<WithdrawalActionButtons
										onValidate={handleValidate}
										onReject={handleReject}
										loading={loading}
									/>

									<div className="space-y-2.5 mt-6">
										<p className="text-primary font-medium">Créer par</p>

										{/* User profile */}
										<div
											className="flex gap-3 items-center cursor-pointer w-fit"
											onClick={handleOpenUserProfile}
											aria-label={`Voir le profil de ${servicesDetails.owner.username}`}
										>
											<Image
												src={"https://placehold.co/60x60/png"}
												alt={servicesDetails.owner.username}
												width={60}
												height={60}
												className="rounded-full"
											/>
											<div className="flex flex-col justify-start">
												<h3 className="text-lg font-semibold text-blue-600">
													{servicesDetails.owner.username}
												</h3>
												<p className="text-neutral-high text-sm">
													{servicesDetails.owner.email}
												</p>
											</div>
										</div>
									</div>
								</div>
							</>
						) : (
							<div className="w-full h-full flex justify-center items-center">
								<Spinner />
							</div>
						)}
					</div>
				</DialogContent>
			</Dialog>
			{servicesDetails && (
				<UserProfilePopup
					open={isUserProfileOpen}
					onClose={handleCloseUserProfile}
					servicesDetails={servicesDetails}
					refetchList={refetchList}
				/>
			)}
		</>
	);
};

export default ServicesRequestsPopup;
