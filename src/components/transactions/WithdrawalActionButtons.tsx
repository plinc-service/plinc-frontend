import { Button } from "../ui/Button";

interface WithdrawalActionButtonsProps {
  onValidate: () => void;
  onReject: () => void;
  loading: boolean;
}

const WithdrawalActionButtons: React.FC<WithdrawalActionButtonsProps> = ({
  onValidate,
  onReject,
  loading
}) => {
  return (
    <div className="flex justify-items-start items-center gap-1 mt-4">
      <Button variant={"ghost"} disabled={loading} className="text-lg" onClick={onValidate}>
        Confirmer le payement
      </Button>
      <Button variant={"outline"} disabled={loading} className="text-lg" onClick={onReject}>
        Rejeter la demande
      </Button>
    </div>
  );
};

export default WithdrawalActionButtons;