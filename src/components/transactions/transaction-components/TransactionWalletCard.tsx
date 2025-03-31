import { TransationsWallet } from "@/services/TransactionService";
import Image from "next/image";
import { FC } from "react";

const TransactionWalletCard: FC<TransationsWallet> = ({ data }) => {
	return (
		<div className="bg-brand-lowest border border-neutral-lowest rounded-3xl p-4 w-full flex justify-start flex-col items-start">
			<h2 className="text-neutral-high text-lg">Solde actuel</h2>
			<span className="flex justify-center items-start my-1.5">
				<span className="text-brand-medium font-semibold">{data.total_amount}</span>
				<span className="block">
					<Image
						src="/icons/euro.svg"
						alt="euro icon"
						width={14}
						height={14}
					/>
				</span>
			</span>
			<p className="text-sm text-neutral-high mt-1 flex items-center gap-1">
				<span className="w-1.5 h-1.5 bg-badge-warning-bg rounded-full block"></span>{" "}
				<span className="text-xs block font-medium">
					{data.amount_in_progress}€
				</span>{" "}
				<span className="block text-xxs">en cours</span>
			</p>
		</div>
	)
}

export default TransactionWalletCard