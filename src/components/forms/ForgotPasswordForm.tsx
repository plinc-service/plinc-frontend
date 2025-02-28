"use client"

import { Button } from "@/components/ui/Button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { ForgotPasswordFormSchema } from "@/schemas/ForgotPasswordFormSchemas";

import { zodResolver } from "@hookform/resolvers/zod";
import { Mail } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";

const ForgotPasswordForm = () => {

	const form = useForm<z.infer<typeof ForgotPasswordFormSchema>>({
		resolver: zodResolver(ForgotPasswordFormSchema),
		defaultValues: {
			email: "",
		},
	})

	function onSubmit(values: z.infer<typeof ForgotPasswordFormSchema>) {
		console.log(values)
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className=" max-w-md w-full bg-white p-10 rounded-3xl text-neutral-high">
				<div className="space-y-3 mb-5">
					<h1 className="text-xl font-semibold">Mot de passe oublié</h1>
					<p className="text-sm">Veuillez entrer votre adresse email pour recevoir un lien de réinitialisation.</p>
				</div>
				<div className="space-y-5">
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Mail</FormLabel>
								<div className="relative">
									<Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-input-placeholder" size={16} />
									<FormControl className="mt-1.5 mb-5">
										<Input type="email" className="h-10 pl-9" placeholder="votre@email.com" {...field} />
									</FormControl>
								</div>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<Button type="submit" className="w-full mt-10 h-10">Envoyer un lien de réinitialisation</Button>
				<Button variant="ghost" className="w-full mt-2 bg-transparent h-10" asChild>
					<Link href="/login">
						Je me souviens de mon mot de passe
					</Link>
				</Button>
			</form>
		</Form>
	)
}

export default ForgotPasswordForm