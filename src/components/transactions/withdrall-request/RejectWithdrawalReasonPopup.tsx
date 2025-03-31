import { RejectWithdrawalReasonPopupProps } from "@/interfaces/transactionInterface";
import {
	X
} from "lucide-react";
import {
	Dialog,
	DialogContent,
	DialogTitle
} from "../../ui/Dialog";
import RejectWithdrawalReasonForm from "./RejectWithdrawalReasonForm";

const RejectWithdrawalReasonPopup: React.FC<RejectWithdrawalReasonPopupProps> = ({
	open,
	onClose,
	transactionDetails,
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
								Rejet de la transaction
							</DialogTitle>
							<button className="hover:text-[#94A3B8] cursor-pointer" onClick={onClose}>
								<X />
							</button>
						</div>
						{
							transactionDetails && (
								<RejectWithdrawalReasonForm
									transactionId={transactionDetails.id}
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

export default RejectWithdrawalReasonPopup;