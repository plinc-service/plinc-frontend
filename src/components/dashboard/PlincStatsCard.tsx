
interface PlincStatsCardProps {
	total: number;
	total_price: number;
	percentage: number;
	commision: number;
	plincCardColor: string;
	plincCardTitle: string;
}

const PlincStatsCard = ({ total, total_price, percentage, commision, plincCardColor, plincCardTitle }: PlincStatsCardProps) => {


	const normalizedPercentage = Math.min(Math.max(percentage, 0), 100);

	const radius = 20;
	const circumference = 2 * Math.PI * radius;
	const dashOffset = circumference * (1 - normalizedPercentage / 100);

	return (
		<div className="flex flex-col p-3 gap-3 border-black/10 border rounded-xl">
			<div className="flex items-center justify-between">
				<div className="text-sm font-bold flex items-center gap-2">
					<span className="block w-2.5 h-2.5 rounded-full" style={{ backgroundColor: plincCardColor }}></span>
					<h3 className="text-neutral-high font-normal text-base">{plincCardTitle}</h3>
				</div>
				<span className="text-sm p-2 rounded-full bg-badge-secondary-bg text-primary min-w-[34px] text-center">{total}</span>
			</div>

			<div>
				<p className="text-base text-neutral-high">{total_price}€</p>
			</div>

			<div className="flex justify-start items-center w-full relative">
				<p className="flex items-center gap-0.5">
					<span className="text-lg font-semibold text-primary">{commision}</span>
					<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M2.66666 6.66667H10.6667M2.66666 9.33333H8.66666M12.6668 3.99998C11.7181 3.13841 10.4816 2.66281 9.20009 2.66665C8.50845 2.67535 7.82529 2.82021 7.18963 3.09295C6.55398 3.36569 5.97827 3.76098 5.4954 4.25624C5.01252 4.7515 4.63193 5.33702 4.37537 5.97938C4.1188 6.62173 3.99128 7.30834 4.00009 7.99998C4.00009 10.9333 6.33342 13.3333 9.20009 13.3333C10.5334 13.3333 11.7334 12.8 12.6668 12" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
					</svg>
					<span className="text-xs text-neutral-high">commision</span>
				</p>

				<div className="absolute right-0 bottom-0 w-11 h-11">
					<svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 44 44">
						<circle
							cx="22"
							cy="22"
							r={radius}
							stroke="currentColor"
							className="text-neutral-low"
							strokeWidth="4"
							fill="none"
						/>

						<circle
							cx="22"
							cy="22"
							r={radius}
							stroke="currentColor"
							strokeWidth="4"
							fill="none"
							className="text-primary"
							strokeDasharray={circumference}
							strokeDashoffset={dashOffset}
							strokeLinecap="round"
						/>
					</svg>

					<div className="absolute inset-0 flex items-center justify-center">
						<span className="text-neutral-high text-xs">{normalizedPercentage.toFixed(1)}%</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PlincStatsCard;