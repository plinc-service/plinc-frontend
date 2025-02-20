"use client"
import { TransactionDetailsPopupProps } from "@/interfaces/transactionInterface";
import { Loader2, X } from "lucide-react";
import Image from 'next/image';
import Link from "next/link";
import { Dialog, DialogContent, DialogTitle } from "../ui/Dialog";
import { Separator } from "../ui/Separator";



const UserProfilePopup: React.FC<TransactionDetailsPopupProps> = ({ open,
	onClose,
	transactionDetails,
}) => {

	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent className="max-w-[800px] w-full">
				{transactionDetails ? (
					<div>
						{/* HEADER */}
						<div className="flex justify-between items-center pb-3.5">
							<DialogTitle className="text-lg text-neutral-high font-medium">
								User {transactionDetails.user.id}
							</DialogTitle>
							<button className="hover:text-[#94A3B8] cursor-pointer" onClick={onClose}>
								<X />
							</button>
						</div>

						<div className="flex m-2">
							<div className="flex flex-col items-center pr-4 w-1/2 relative">
								<div className="h-16 w-16 rounded-full bg-neutral-100 flex items-center justify-center overflow-hidden">
									<Image
										src={transactionDetails.user.image_url || "/avatar.svg"}
										alt={transactionDetails.user.username}
										width={64}
										height={64}
										className="rounded-full"
									/>
								</div>

								<div className="mt-3 text-center">
									<h2 className="text-lg text-primary">{transactionDetails.user.username}</h2>
									<p className="text-sm text-neutral-high">{transactionDetails.user.email}</p>
									<p className="text-base text-blue font-semibold mt-2">PlinC</p>

								</div>

								<div className="mt-4 w-full flex justify-center text-neutral-high">
									<div className="flex flex-col items-center relative px-6">
										<span className="text-2xl font-bold">{transactionDetails.user.number_plinc_buyer}</span>
										<span className="text-xs">Achetés</span>
										<Separator
											orientation="vertical"
											className="absolute right-0 h-12"
										/>
									</div>
									<div className="flex flex-col items-center px-6">
										<span className="text-2xl font-bold">{transactionDetails.user.number_plinc_seller}</span>
										<span className="text-xs">Vendus</span>
									</div>
								</div>
								<Separator
									orientation="vertical"
									className="absolute right-0 h-full"
								/>

								<Link
									href={`/users/${transactionDetails.user.id.replace("#", "")}/plincs`}
									className="text-sm mt-4 bg-blue text-white p-2.5 rounded-full w-full block text-center hover:bg-blue/90 transition-colors"
								>
									Voir les plincs
								</Link>
							</div>

							<div className="pl-4 w-1/2">
								<div className="grid grid-cols-2">
									<div className="space-y-1">
										<h3 className="text-sm font-medium text-neutral-high">
											Profession
										</h3>
										<p className="text-base font-medium text-blue">{transactionDetails.user.profession || "Non renseigné"}</p>
									</div>

									<div className="space-y-1">
										<h3 className="text-sm font-medium text-neutral-high">Phone</h3>
										<p className="text-base font-medium text-blue">{transactionDetails.user.phone || "Non renseigné"}</p>
									</div>
								</div>

								<div className="grid grid-cols-2 my-5">
									<div className="space-y-1">
										<h3 className="text-sm font-medium text-neutral-high">
											Ville
										</h3>
										<p className="text-base font-medium text-blue">{transactionDetails.user.address_client || "Non renseigné"}</p>
									</div>

									<div className="space-y-1">
										<h3 className="text-sm font-medium text-neutral-high">Adresse</h3>
										<p className="text-base font-medium text-blue">{transactionDetails.user.address_prestataire || "Non renseigné"}</p>
									</div>
								</div>


								<div className="grid grid-cols-1">
									<div className="space-y-1">
										<h3 className="text-sm font-medium text-neutral-high">
											SIRET
										</h3>
										<p className="text-base font-medium text-blue">{transactionDetails.user.siret_num || "Non renseigné"}</p>
									</div>

									<div className="space-y-1 my-5">
										<h3 className="text-sm font-medium text-neutral-high">IBAN</h3>
										<p className="text-base font-medium text-blue">{transactionDetails.user.iban_num || "Non renseigné"}</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				) : (
					<div className="w-full h-full flex justify-center items-center">
						<Loader2 className="mr-2 h-4 w-4 animate-spin" />
					</div>
				)}

			</DialogContent>
		</Dialog>
	)
}

export default UserProfilePopup