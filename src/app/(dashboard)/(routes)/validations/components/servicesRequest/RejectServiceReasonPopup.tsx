import RejectServiceReasonForm from "@/components/forms/RejectServiceReasonForm";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/Dialog";
import { RejectServiceReasonPopupProps } from "@/interfaces/serviceInterface";
import {
	X
} from "lucide-react";

const RejectServiceReasonPopup: React.FC<RejectServiceReasonPopupProps> = ({
	open,
	onClose,
	servicesDetails,
	refetchList,
	closeAllPopups
}) => {

	const handleClose = () => {
		onClose();
	};

	return (
		<>
			<Dialog open={open} onOpenChange={handleClose}>
				<DialogContent className="max-w-[700px] w-full">
					<div className="space-y-3">
						{/* HEADER */}
						<div className="flex justify-between items-center">
							<DialogTitle className="text-lg text-neutral-high font-medium">
								Rejet de service
							</DialogTitle>
							<button className="hover:text-[#94A3B8] cursor-pointer" onClick={onClose}>
								<X />
							</button>
						</div>
						{
							servicesDetails && (
								<RejectServiceReasonForm
									serviceId={servicesDetails.id}
									closePopup={onClose}
									refetchList={refetchList}
									onClose={closeAllPopups}
								/>
							)
						}
					</div>
				</DialogContent>
			</Dialog>
		</>
	);
};

export default RejectServiceReasonPopup;