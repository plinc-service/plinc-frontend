"use client"

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { CreateCategoryFormSchema } from "@/schemas/CategoryFormSchemas";

import { useCreateCategory } from "@/hooks/useCategory";
import { zodResolver } from "@hookform/resolvers/zod";
import { forwardRef, useEffect, useImperativeHandle } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface CreateCategoryFormProps {
	onClose: () => void;
	refetchList: () => void;
	onLoadingChange?: (isLoading: boolean) => void;
}

const CreateCategoryForm = forwardRef<{ submit: () => void }, CreateCategoryFormProps>(({ onClose, refetchList, onLoadingChange }, ref) => {

	const {
		mutate,
		isPending,
	} = useCreateCategory();

	useEffect(() => {
		if (onLoadingChange) {
			onLoadingChange(isPending);
		}
	}, [isPending, onLoadingChange]);

	type FormValues = z.infer<typeof CreateCategoryFormSchema>;

	const form = useForm<FormValues>({
		resolver: zodResolver(CreateCategoryFormSchema),
		defaultValues: {
			name: "",
			color: "#000000",
		},
	});

	useImperativeHandle(ref, () => ({
		submit: () => form.handleSubmit(onSubmit)(),
	}));

	function onSubmit(values: FormValues) {
		mutate(values, {
			onSuccess: () => {
				toast.success("Catégorie créée avec succès");
				form.reset();
				onClose();
				refetchList();
			},
			onError: () => {
				toast.error("Une erreur est survenue lors de la création de la catégorie");
			}
		});
	}

	const handleColorChange = (value: string, onChange: (value: string) => void) => {
		const isValidHex = /^#([0-9A-F]{3}){1,2}$/i.test(value);

		if (isValidHex || value === "#" || value === "") {
			onChange(value);
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="w-full text-neutral-high">
				<div className="space-y-5 flex w-full gap-3">
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem
								className="w-full"
							>
								<FormLabel>Titre</FormLabel>
								<FormControl className="mt-1.5 mb-5">
									<Input type="text" className="h-10 mb-0" placeholder="Nom de la catégorie" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="color"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>Couleur</FormLabel>
								<div className="relative mt-1.5">
									<div className="flex items-center border border-neutral-low rounded-full overflow-hidden bg-background">
										<div
											className="h-4 w-4 rounded-[2px] ml-4 cursor-pointer flex-shrink-0"
											style={{ backgroundColor: field.value }}
										>
											<input
												type="color"
												className="opacity-0 w-full h-full cursor-pointer"
												value={field.value}
												onChange={(e) => handleColorChange(e.target.value, field.onChange)}
											/>
										</div>
										<div className="px-3 py-2 text-sm text-gray-600">
											{field.value.toUpperCase()}
										</div>
									</div>
								</div>
							</FormItem>
						)}
					/>
				</div>
			</form>
		</Form>
	);
});

CreateCategoryForm.displayName = "CreateCategoryForm";

export default CreateCategoryForm;