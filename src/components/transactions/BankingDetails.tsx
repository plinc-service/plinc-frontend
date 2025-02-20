import { Check, Copy } from "lucide-react";
import { useState } from "react";

interface TransactionDetails {
	iban_num?: string;
	siret_num?: string;
}

interface BankingDetailsProps {
	transactionDetails: TransactionDetails;
}

const BankingDetails: React.FC<BankingDetailsProps> = ({ transactionDetails }) => {
	const [copiedField, setCopiedField] = useState<string | null>(null);

	const copyToClipboard = async (text: string, fieldName: string) => {
		try {
			await navigator.clipboard.writeText(text);
			setCopiedField(fieldName);

			setTimeout(() => {
				setCopiedField(null);
			}, 2000);
		} catch (err) {
			console.error('Erreur lors de la copie:', err);
		}
	};

	const iban = transactionDetails.iban_num || "Non disponible";
	const bic = transactionDetails.siret_num || "Non disponible";

	return (
		<div className="space-y-4">
			{/* IBAN */}
			<div className="w-full rounded-full bg-brand-lowest flex justify-between items-center px-4 py-3">
				<p className="inline-flex gap-2 font-medium text-lg text-primary">
					<span className="block uppercase font-normal text-neutral-high">iban</span>
					{iban}
				</p>
				<button
					className={`flex justify-center items-center gap-1.5 rounded-full ${copiedField === 'iban' ? 'bg-green-600' : 'bg-primary'} text-brand-lowest px-4 py-2 cursor-pointer transition-colors hover:bg-[#1D4ED8]`}
					onClick={() => copyToClipboard(iban, 'iban')}
				>
					{copiedField === 'iban' ? (
						<>
							<Check size={16} />
							Copié
						</>
					) : (
						<>
							<Copy size={16} />
							Copier
						</>
					)}
				</button>
			</div>

			{/* BIC */}
			<div className="w-full rounded-full bg-brand-lowest flex justify-between items-center px-4 py-3">
				<p className="inline-flex gap-2 font-medium text-lg text-primary">
					<span className="block uppercase font-normal text-neutral-high">bic</span>
					{bic}
				</p>
				<button
					className={`flex justify-center items-center gap-1.5 rounded-full ${copiedField === 'bic' ? 'bg-green-600' : 'bg-primary'} text-brand-lowest px-4 py-2 cursor-pointer transition-colors hover:bg-[#1D4ED8]`}
					onClick={() => copyToClipboard(bic, 'bic')}
				>
					{copiedField === 'bic' ? (
						<>
							<Check size={16} />
							Copié
						</>
					) : (
						<>
							<Copy size={16} />
							Copier
						</>
					)}
				</button>
			</div>
		</div>
	);
};

export default BankingDetails;