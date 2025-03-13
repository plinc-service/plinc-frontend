import { Button } from "@/components/ui/Button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/Dialog";
import { Separator } from "@/components/ui/Separator";
import Spinner from "@/components/ui/Spinner";
import { useCategoryRequests } from "@/hooks/useCategory";
import {
	Plus,
	X
} from "lucide-react";
import { useRef, useState } from "react";
import CreateCategoryForm from "./CreateCategoryForm";

const CreateCategoryPopup = ({
	open,
	onClose,
}: {
	open: boolean;
	onClose: () => void;
}) => {

	const [isFormSubmitting, setIsFormSubmitting] = useState(false)
	const { refetch: refetchCategories } = useCategoryRequests();

	const formRef = useRef<{ submit: () => void }>(null);

	const handleSave = () => {
		if (formRef.current) {
			formRef.current.submit();
		}
	};

	const handleClose = () => {
		onClose();
	};

	return (
		<>
			<Dialog open={open} onOpenChange={handleClose}>
				<DialogContent className="max-w-[700px] w-full">

					{/* HEADER */}
					<div className="flex justify-between items-center">
						<DialogTitle className="text-lg text-neutral-high font-medium">
							Nouvelle catégorie
						</DialogTitle>
						<div className="flex gap-4">
							<Button size={"sm"} onClick={handleSave} disabled={isFormSubmitting}>
								{isFormSubmitting && <Spinner className="text-white" />}
								{" "}Enregistrer
							</Button>
							<button className="hover:text-[#94A3B8] cursor-pointer" onClick={onClose}>
								<X />
							</button>
						</div>
					</div>
					<CreateCategoryForm ref={formRef} onClose={handleClose} refetchList={refetchCategories} onLoadingChange={setIsFormSubmitting} />

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
		</>
	);
};

export default CreateCategoryPopup;