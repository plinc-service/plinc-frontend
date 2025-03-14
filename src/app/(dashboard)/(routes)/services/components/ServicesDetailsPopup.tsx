import { Dialog, DialogContent, DialogTitle } from "@/components/ui/Dialog";
import { Separator } from "@/components/ui/Separator";
import Spinner from "@/components/ui/Spinner";
import { Switch } from "@/components/ui/Switch";
import { useActivateService, useDesactivateService, useServiceDetails } from "@/hooks/useValidations";
import { ServicesRequestDetailsPopupProps } from "@/interfaces/serviceInterface";
import {
	X
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import UserProfilePopup from "../../validations/components/UserProfilePopup";
const ServicesDetailsPopup: React.FC<ServicesRequestDetailsPopupProps> = ({
	open,
	onClose,
	service_id,
	refetchList
}) => {

	const [isUserProfileOpen, setIsUserProfileOpen] = useState(false);

	const handleClose = () => {
		onClose();
	};

	const { activateService, isActivating } = useActivateService();
	const { desactivateService, isDesactivating } = useDesactivateService();
	const {
		data: servicesDetails,
		isLoading: isServiceDetailsLoading,
		refetch: refetchServiceDetails
	} = useServiceDetails(service_id?.toString() || "");

	if (isServiceDetailsLoading) {
		return <div className="w-full h-full flex justify-center items-center"><Spinner /></div>
	}

	const handleActivateService = () => {
		const serviceIdString = service_id?.toString() || "";
		activateService(serviceIdString);
		refetchServiceDetails();
	}

	const handleDesactivateService = () => {
		const serviceIdString = service_id?.toString() || "";
		desactivateService(serviceIdString);
		refetchServiceDetails();
	}

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
						{servicesDetails ? (
							<>
								<div className="flex justify-between items-center">
									<DialogTitle className="text-lg text-neutral-high font-medium">
										Services #{servicesDetails.id}
									</DialogTitle>
									<button className="hover:text-[#94A3B8] cursor-pointer" onClick={onClose}>
										<X />
									</button>
								</div>
								<div>
									<div className="flex justify-between items-center">
										<span className="font-semibold block text-primary text-xl">{servicesDetails.name}</span>
										<Switch checked={servicesDetails.is_active === true} onCheckedChange={() => {
											if (servicesDetails.is_active === true) {
												handleDesactivateService();
											} else {
												handleActivateService();
											}
										}} disabled={isActivating || isDesactivating} />
									</div>

									<div className="space-y-1 mt-2">
										<span className="block text-lg font-medium text-neutral-high">{servicesDetails.category}</span>
										<p className="text-neutral-high text-base">{servicesDetails.description || "Pas de description"}</p>
									</div>

									<div className="w-full flex justify-between items-center">
										<div className="mt-4 w-fit flex justify-center text-neutral-high">
											<div className="flex flex-col items-center relative px-6">
												<span className="text-2xl font-bold">{servicesDetails.number_of_sells}</span>
												<span className="text-xs">ventes</span>
												<Separator
													orientation="vertical"
													className="absolute right-0 h-12"
												/>
											</div>
											<div className="flex flex-col items-center px-6">
												<span className="text-2xl font-bold">{servicesDetails.number_of_waiting}</span>
												<span className="text-xs">en cours</span>
											</div>
										</div>

										<span className="block text-neutral-high text-sm">
											Crée le{" "}{new Date(servicesDetails?.created_at).toLocaleDateString("fr-FR", {
												day: "2-digit",
												month: "2-digit",
												year: "numeric"
											})}
										</span>
									</div>

									<Separator orientation="horizontal" className="mt-4" />

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

export default ServicesDetailsPopup;
