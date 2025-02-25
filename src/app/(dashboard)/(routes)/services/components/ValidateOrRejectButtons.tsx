import { Button } from "@/components/ui/Button";


interface ValidateOrRejectButtonsProps {
	onValidate: () => void;
	onReject: () => void;
	loading: boolean;
}

const ValidateOrRejectButtons: React.FC<ValidateOrRejectButtonsProps> = ({
	onValidate,
	onReject,
	loading
}) => {
	return (
		<div className="flex justify-items-start items-center gap-1 mt-4">
			<Button variant={"ghost"} disabled={loading} className="text-lg" onClick={onValidate}>
				Valider le service
			</Button>
			<Button variant={"outline"} disabled={loading} className="text-lg" onClick={onReject}>
				Rejeter le service
			</Button>
		</div>
	)
}

export default ValidateOrRejectButtons