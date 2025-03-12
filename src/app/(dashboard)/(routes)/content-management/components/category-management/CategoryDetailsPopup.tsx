import { Button } from "@/components/ui/Button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/Dialog";
import { Input } from "@/components/ui/Input";
import { Separator } from "@/components/ui/Separator";
import Spinner from "@/components/ui/Spinner";
import { useCategoryRequests, useDeleteCategory } from "@/hooks/useCategory";
import { CategoryDetailsPopupProps } from "@/interfaces/categoryInterface";
import {
	Plus,
	Search,
	X
} from "lucide-react";
import { useEffect, useState } from "react";
import UpdateCategoryPopup from "./UpdateCategoryPopup";

const CategoryDetailsPopup: React.FC<CategoryDetailsPopupProps> = ({
	open,
	onClose,
	categoryDetails,
}) => {

	const [localError, setLocalError] = useState<string | null>(null);
	const [isUpdateCategoryPopupOpen, setIsUpdateCategoryPopupOpen] = useState(false);

	const {
		mutate: deleteCategory,
		isPending: isDeletingCategory,
		error: deleteCategoryError,
	} = useDeleteCategory();

	const { refetch: refetchCategories } = useCategoryRequests();


	useEffect(() => {
		if (!open) {
			setLocalError(null);
		}
	}, [open]);


	const handleDeleteCategory = () => {
		if (categoryDetails?.id) {
			deleteCategory(categoryDetails.id.toString(), {
				onSuccess: () => {
					handleClose();
					refetchCategories();
				},
			});
		}
	};

	const handleOpenUpdateCategoryPopup = () => {
		setIsUpdateCategoryPopupOpen(true);
	};

	const handleCloseUpdateCategoryPopup = () => {
		setIsUpdateCategoryPopupOpen(false);
		onClose();
	};

	const handleClose = () => {
		setLocalError(null);
		onClose();
	};

	return (
		<>
			<Dialog open={open} onOpenChange={handleClose}>
				<DialogContent className="max-w-[700px] w-full">
					{localError && (
						<div className="bg-red-50 text-red-600 p-3 rounded-md">
							{deleteCategoryError}
						</div>
					)}

					<div className="space-y-3">
						{/* HEADER */}
						{categoryDetails ? (
							<>
								<div className="flex justify-between items-center mb-4">
									<DialogTitle className="text-lg text-neutral-high font-medium">
										Catégorie #{categoryDetails.id}
									</DialogTitle>
									<button className="hover:text-[#94A3B8] cursor-pointer" onClick={onClose}>
										<X />
									</button>
								</div>
								<div>
									<div className="flex justify-between items-center">
										<div className="flex items-center gap-2">
											<span className="w-4 h-4 rounded-[2px] inline-block" style={{ backgroundColor: categoryDetails.color }}></span>
											<span className="font-semibold block text-primary text-xl">{categoryDetails.name}</span>
										</div>
										<span className="block text-neutral-high text-sm">
											Crée le{" "}{new Date(categoryDetails?.created_at).toLocaleDateString("fr-FR", {
												day: "2-digit",
												month: "2-digit",
												year: "numeric"
											})}
										</span>
									</div>
								</div>
								<div className="flex items-center gap-2">
									<Button variant={"ghost"} size={"sm"} onClick={handleOpenUpdateCategoryPopup}>Modifier</Button>
									<Button variant={"outline"}
										size={"sm"}
										onClick={handleDeleteCategory}
										disabled={isDeletingCategory}>
										{isDeletingCategory && <Spinner />}
										Supprimer la catégorie
									</Button>
								</div>

								<Separator className="my-4" />

								<div className="flex justify-between items-center w-full">
									<h3 className="text-lg text-primary font-medium">
										Sous catégories
									</h3>
									<div className="flex items-center gap-4 justify-end">
										<div className="relative w-fit">
											<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-input-placeholder" />
											<Input
												placeholder="Rechercher"
												className="pl-9 h-10 max-w-[170px]"
												disabled
											/>
										</div>
										<Button size={"sm"} disabled>
											<Plus className="h-4 w-4" />
											<span>Ajouter une sous catégorie</span>
										</Button>
									</div>
								</div>

								<div className="text-sm text-neutral-high min-h-[200px] flex items-center justify-center font-medium">
									Aucune sous catégorie
								</div>
							</>
						) : (
							<div className="w-full h-full flex justify-center items-center">
								<Spinner />
							</div>
						)}
					</div>
				</DialogContent>
			</Dialog>
			<UpdateCategoryPopup
				open={isUpdateCategoryPopupOpen}
				onClose={handleCloseUpdateCategoryPopup}
				category={categoryDetails}
			/>
		</>
	);
};

export default CategoryDetailsPopup;