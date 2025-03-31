import { Button } from "@/components/ui/Button";
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/Form";
import Spinner from "@/components/ui/Spinner";
import { Textarea } from "@/components/ui/Textarea";
import { useRejectService } from "@/hooks/useTransactions";
import { rejectServiceSchema } from "@/schemas/RejectFormSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

const RejectServiceReasonForm = ({ serviceId, closePopup, refetchList, onClose }: { serviceId: number, closePopup: () => void, refetchList: () => void, onClose: () => void }) => {
	const form = useForm<z.infer<typeof rejectServiceSchema>>({
		resolver: zodResolver(rejectServiceSchema),
		defaultValues: {
			motif: "",
		},
	});

	const {
		rejectLoading,
		rejectService
	} = useRejectService();

	async function onSubmit(values: z.infer<typeof rejectServiceSchema>) {
		if (serviceId) {
			rejectService(
				{
					id: serviceId,
					rejected_reason: values.motif,
				},
				{
					onSuccess: () => {
						refetchList();
						onClose();
					},
				}
			);
		}
	}

	return (
		<FormProvider  {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<div className="py-4">
					<FormField
						control={form.control}
						name="motif"
						disabled={rejectLoading}
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Textarea
										placeholder="Dites à l'utilisateur le motif du rejet"
										className="resize-none w-full min-h-36 rounded-3xl p-4"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<div className="w-full flex items-center justify-end gap-1.5">
					<Button disabled={rejectLoading} type="submit" size="sm">{rejectLoading && <Spinner className="text-white" />} Confirmer</Button>
					<Button disabled={rejectLoading} variant="outline" size="sm" onClick={closePopup}>Annuler</Button>
				</div>
			</form>
		</FormProvider>
	);
};

export default RejectServiceReasonForm;