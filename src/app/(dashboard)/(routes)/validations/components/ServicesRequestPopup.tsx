import { Dialog, DialogContent, DialogTitle } from "@/components/ui/Dialog";
import Spinner from "@/components/ui/Spinner";
import { useRejectService, useValidateService } from "@/hooks/useTransactions";
import { useServiceDetails } from "@/hooks/useValidations";
import { ServicesRequestDetailsPopupProps } from "@/interfaces/serviceInterface";
import {
	X
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import ValidateOrRejectButtons from "../../services/components/ValidateOrRejectButtons";
import UserProfilePopup from "./UserProfilePopup";

const ServicesRequestsPopup: React.FC<ServicesRequestDetailsPopupProps> = ({
	open,
	onClose,
	refetchList,
	service_id
}) => {

	const [isUserProfileOpen, setIsUserProfileOpen] = useState(false);

	const {
		validateService,
		validateLoading,
	} = useValidateService(() => {
		refetchList();
		onClose();
	});

	const {
		rejectService,
		rejectLoading,
	} = useRejectService(() => {
		refetchList();
		onClose();
	});

	const {
		data: servicesDetails,
		// isLoading: isServiceDetailsLoading,
		// refetch: refetchServiceDetails
	} = useServiceDetails(service_id?.toString() || "");

	const handleValidate = () => {
		if (servicesDetails?.id) {
			validateService({ id: servicesDetails.id.toString() });
		}
	};

	const handleReject = () => {
		if (servicesDetails?.id) {
			rejectService({ id: servicesDetails.id.toString() });
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

	return (
		<>
			<Dialog open={open} onOpenChange={handleClose}>
				<DialogContent className="max-w-[700px] w-full">

					<div className="space-y-3">
						{/* HEADER */}

						<div className="flex justify-between items-center">
							<DialogTitle className="text-lg text-neutral-high font-medium">
								{servicesDetails ? `Services ${servicesDetails.id}` : "Chargement..."}
							</DialogTitle>
							<button className="hover:text-[#94A3B8] cursor-pointer" onClick={onClose}>
								<X />
							</button>
						</div>

						{servicesDetails ? (
							<>
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
									<ValidateOrRejectButtons
										onValidate={handleValidate}
										onReject={handleReject}
										validateLoading={validateLoading}
										rejectLoading={rejectLoading}
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
