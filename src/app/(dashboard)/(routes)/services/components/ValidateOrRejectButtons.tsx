import { Button } from "@/components/ui/Button";
import Spinner from "@/components/ui/Spinner";


interface ValidateOrRejectButtonsProps {
	onValidate: () => void;
	onReject: () => void;
	validateLoading: boolean;
	rejectLoading: boolean;
}

const ValidateOrRejectButtons: React.FC<ValidateOrRejectButtonsProps> = ({
	onValidate,
	onReject,
	validateLoading,
	rejectLoading
}) => {
	return (
		<div className="flex justify-items-start items-center gap-1 mt-4">
			<Button variant={"ghost"} disabled={validateLoading} className="text-lg" onClick={onValidate}>
				{validateLoading ? (
					<>
						<Spinner className="text-blue-900" />
						<span className="ml-2">Validation en cours...</span>
					</>
				) : (
					"Valider le service"
				)}
			</Button>
			<Button variant={"outline"} disabled={rejectLoading} className="text-lg" onClick={onReject}>
				{rejectLoading ? (
					<>
						<Spinner className="text-white" />
						<span className="ml-2">Rejet en cours...</span>
					</>
				) : (
					"Rejeter le service"
				)}
			</Button>
		</div>
	)
}

export default ValidateOrRejectButtons