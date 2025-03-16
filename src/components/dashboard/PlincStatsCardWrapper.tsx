import { usePlincStats } from "@/hooks/useDashboard";
import PlincStatsCard from "./PlincStatsCard";
import PlincStatsCardSkeleton from "./PlincStatsCardSkeleton";

const PlincStatsCardWrapper = () => {
	const {
		plincConfirmed,
		plincWaiting,
		plincAccepted,
		plincRejected,
		plincDuring,
		plincShipped,
		plincLitiged,
		plincTerminated,
		isLoading
	} = usePlincStats();

	const cards = [
		{
			data: plincWaiting,
			color: "#F97316",
			title: "En attente"
		},
		{
			data: plincAccepted,
			color: "#F97316",
			title: "Accepté"
		},
		{
			data: plincConfirmed,
			color: "#3B82F6",
			title: "Confirmé"
		},
		{
			data: plincDuring,
			color: "#10B981",
			title: "En cours"
		},
		{
			data: plincShipped,
			color: "#F97316",
			title: "Livré"
		},
		{
			data: plincTerminated,
			color: "#475569",
			title: "Terminé"
		},
		{
			data: plincLitiged,
			color: "#EF4444",
			title: "Litige"
		},
		{
			data: plincRejected,
			color: "#EF4444",
			title: "Annulé"
		}
	];

	return (
		<div className="grid grid-cols-4 grid-rows-2 gap-4">
			{isLoading ? (
				// Afficher des skeletons pendant le chargement
				Array(8).fill(0).map((_, index) => (
					<PlincStatsCardSkeleton key={`skeleton-${index}`} />
				))
			) : (
				cards.map((card, index) => (
					card.data && (
						<PlincStatsCard
							key={`card-${card.title}-${index}`}
							total={card.data.total}
							total_price={card.data.total_price}
							percentage={card.data.percentage}
							commision={card.data.commision}
							plincCardColor={card.color}
							plincCardTitle={card.title}
						/>
					)
				))
			)}
		</div>
	);
};

export default PlincStatsCardWrapper;