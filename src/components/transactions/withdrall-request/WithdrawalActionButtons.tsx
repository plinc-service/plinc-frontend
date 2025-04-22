import { Button } from "@/components/ui/Button";
import Spinner from "@/components/ui/Spinner";

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
        {loading && <Spinner />} Confirmer le payement
      </Button>
      <Button variant={"outline"} disabled={loading} className="text-lg" onClick={onReject}>
        Rejeter le payment
      </Button>
    </div>
  );
};

export default WithdrawalActionButtons;