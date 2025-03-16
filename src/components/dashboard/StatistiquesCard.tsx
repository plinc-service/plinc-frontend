import { ArrowDown, ArrowUp } from "lucide-react";

interface StatistiquesCardProps {
	total: number;
	icon: React.ReactNode;
	dollarIcon?: boolean;
	increased: boolean;
	percentage: number;
	bg_bleu?: boolean;
	statistiquesCardTitle: string;
}

const StatistiquesCard = ({ total, increased, percentage, bg_bleu, statistiquesCardTitle, icon, dollarIcon }: StatistiquesCardProps) => {

	return (
		<div className={`flex flex-col p-3 gap-5 border-brand-lower border rounded-xl ${bg_bleu ? "bg-brand-lowest" : "bg-white"}`}>
			<div className="flex items-start justify-between">
				<div className="flex items-center h-full gap-3">
					<span className="block bg-primary w-1 h-full rounded-full"></span>
					<div className="flex flex-col gap-[7px]">
						<h3 className="text-neutral font-normal text-sm">{statistiquesCardTitle}</h3>
						{dollarIcon === true ?
							(
								<div className="flex items-start gap-2.5">
									<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M2.66666 6.66667H10.6667M2.66666 9.33333H8.66666M12.6668 3.99998C11.7181 3.13841 10.4816 2.66281 9.20009 2.66665C8.50845 2.67535 7.82529 2.82021 7.18963 3.09295C6.55398 3.36569 5.97827 3.76098 5.4954 4.25624C5.01252 4.7515 4.63193 5.33702 4.37537 5.97938C4.1188 6.62173 3.99128 7.30834 4.00009 7.99998C4.00009 10.9333 6.33342 13.3333 9.20009 13.3333C10.5334 13.3333 11.7334 12.8 12.6668 12" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
									</svg>
									<p className={`text-neutral-high font-normal text-2xl ${bg_bleu ? "text-primary" : "text-neutral-high"}`}>{total}</p>
								</div>
							)
							:
							<p className={`text-neutral-high font-normal text-2xl ${bg_bleu ? "text-primary" : "text-neutral-high"}`}>{total}</p>
						}
					</div>
				</div>
				<div className="w-9 h-9 rounded-full bg-brand-lower text-primary flex items-center justify-center">
					{icon}
				</div>
			</div>
			<div className="flex gap-1 items-center">
				<p className={`font-normal text-sm flex items-center gap-1 ${increased ? "text-badge-success-text" : "text-badge-danger-text"}`}>{increased ? <ArrowUp className="w-3.5 h-3.5" /> : <ArrowDown className="w-3.5 h-3.5" />}{percentage}%</p>
				<p className="text-neutral font-normal text-xs">depuis le mois passé</p>
			</div>
		</div>
	);
};

export default StatistiquesCard;