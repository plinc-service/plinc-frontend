import { Button } from "@/components/ui/Button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/Dialog";
import { Separator } from "@/components/ui/Separator";
import Spinner from "@/components/ui/Spinner";
import { useCategoryRequests } from "@/hooks/useCategory";
import { Category } from "@/interfaces/categoryInterface";
import { Plus, X } from "lucide-react";
import { useRef, useState } from "react";
import UpdateCategoryForm from "./UpdateCategoryForm";

interface UpdateCategoryPopupProps {
	open: boolean;
	onClose: () => void;
	category: Category | null;
}

const UpdateCategoryPopup: React.FC<UpdateCategoryPopupProps> = ({
	open,
	onClose,
	category,
}) => {
	const [isFormSubmitting, setIsFormSubmitting] = useState(false);
	const formRef = useRef<{ submit: () => void }>(null);
	const { refetch: refetchCategories } = useCategoryRequests();

	const handleSubmit = () => {
		formRef.current?.submit();
	};

	const handleClose = () => {
		onClose();
	};

	if (!category) return null;

	return (
		<Dialog open={open} onOpenChange={handleClose}>
			<DialogContent className="max-w-[700px] w-fulll">
				<div className="flex justify-between items-center">
					<DialogTitle className="text-lg text-neutral-high font-medium">
						Modifier la catégorie
					</DialogTitle>
					<div className="flex gap-4">
						<Button size={"sm"} onClick={handleSubmit} disabled={isFormSubmitting}>
							{isFormSubmitting && <Spinner className="text-white" />} Enregistrer
						</Button>
						<button className="hover:text-[#94A3B8] cursor-pointer" onClick={handleClose}>
							<X />
						</button>
					</div>
				</div>

				<UpdateCategoryForm
					ref={formRef}
					onClose={handleClose}
					refetchList={refetchCategories}
					name={category.name}
					color={category.color}
					categoryId={category.id.toString()}
					onLoadingChange={setIsFormSubmitting}
				/>


				<Separator />

				{/* Subcategories */}
				<div className="flex flex-col gap-4 justify-between items-center">
					<div className="flex justify-between items-center w-full">
						<h3 className="text-lg text-primary font-medium">
							Sous catégories
						</h3>
						<div className="flex gap-4">
							<Button size={"sm"} disabled>
								<Plus className="h-4 w-4" />
								<span>Ajouter une sous catégorie</span>
							</Button>
						</div>
					</div>
					<div className="text-sm text-neutral-high min-h-[200px] flex items-center justify-center font-medium">
						Aucune sous catégorie
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default UpdateCategoryPopup;