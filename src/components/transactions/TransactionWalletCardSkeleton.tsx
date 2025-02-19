const TransactionWalletCardSkeleton = () => {
	return (
		<div className="bg-brand-lowest border border-neutral-lowest rounded-3xl p-4 w-full flex justify-start flex-col items-start animate-pulse">
			<h2 className="text-neutral-high text-lg">Solde actuel</h2>
			<span className="flex justify-center items-start my-1.5">
				<span className="bg-gray-200 h-6 w-20 rounded"></span>
				<span className="block ml-2 bg-gray-200 h-6 w-6 rounded-full"></span>
			</span>
			<p className="text-sm text-neutral-high mt-1 flex items-center gap-1">
				<span className="w-1.5 h-1.5 bg-badge-warning-bg rounded-full block"></span>{" "}
				<span className="bg-gray-200 h-4 w-12 rounded"></span>{" "}
				<span className="block bg-gray-200 h-3 w-8 rounded"></span>
			</p>
		</div>
	)
}

export default TransactionWalletCardSkeleton