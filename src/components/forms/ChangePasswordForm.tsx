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
import { ChangePasswordFormSchema } from "@/schemas/ChangePasswordFormSchemas";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Lock } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const ChangePasswordForm = () => {
	const [showPassword, setShowPassword] = useState(false);

	const toggleShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const form = useForm<z.infer<typeof ChangePasswordFormSchema>>({
		resolver: zodResolver(ChangePasswordFormSchema),
		defaultValues: {
			newPassword: "",
			confirmNewPassword: "",
		},
	})

	function onSubmit(values: z.infer<typeof ChangePasswordFormSchema>) {
		console.log(values)
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className=" max-w-md w-full bg-white p-10 rounded-3xl text-neutral-high">
				<div className="space-y-3 mb-5">
					<h1 className="text-xl font-semibold">Changer votre mot de passe</h1>
					<p className="text-sm">Créez un nouveau mot de passe sécurisé pour accéder à votre compte</p>
				</div>
				<div className="space-y-5">
					<FormField
						control={form.control}
						name="newPassword"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Mot de passe</FormLabel>
								<div className="relative">
									<Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-input-placeholder" size={16} />
									<FormControl className="mt-1.5">
										<Input type={showPassword ? "text" : "password"} className="h-10 px-9" placeholder="********" {...field} />
									</FormControl>
									{showPassword ? (
										<Eye className="absolute right-3 top-1/2 -translate-y-1/2 text-input-placeholder cursor-pointer" size={16} onClick={toggleShowPassword} />
									) : (
										<EyeOff className="absolute right-3 top-1/2 -translate-y-1/2 text-input-placeholder cursor-pointer" size={16} onClick={toggleShowPassword} />
									)}
								</div>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="confirmNewPassword"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Confirmer le mot de passe</FormLabel>
								<div className="relative">
									<Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-input-placeholder" size={16} />
									<FormControl className="mt-1.5">
										<Input type={showPassword ? "text" : "password"} className="h-10 px-9" placeholder="********" {...field} />
									</FormControl>
									{showPassword ? (
										<Eye className="absolute right-3 top-1/2 -translate-y-1/2 text-input-placeholder cursor-pointer" size={16} onClick={toggleShowPassword} />
									) : (
										<EyeOff className="absolute right-3 top-1/2 -translate-y-1/2 text-input-placeholder cursor-pointer" size={16} onClick={toggleShowPassword} />
									)}
								</div>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<Button type="submit" className="w-full mt-10">Changer le mot de passe</Button>
			</form>
		</Form>
	)
}

export default ChangePasswordForm