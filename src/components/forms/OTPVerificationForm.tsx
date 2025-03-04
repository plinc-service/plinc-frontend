"use client"

import { Button } from "@/components/ui/Button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage
} from "@/components/ui/Form";

import { useAuth } from "@/hooks/useAuth";
import { OtpVerificationFormSchema } from "@/schemas/OtpVerificationFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAuthContext } from "../contexts/AuthContext";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/InputOTP";
import Spinner from "../ui/Spinner";

const OTPVerificationForm = () => {

	const { verifyOTP, verifyIsLoading } = useAuth()
	const { email } = useAuthContext()

	const form = useForm<z.infer<typeof OtpVerificationFormSchema>>({
		resolver: zodResolver(OtpVerificationFormSchema),
		defaultValues: {
			pin: "",
		},
	})

	function onSubmit(values: z.infer<typeof OtpVerificationFormSchema>) {
		verifyOTP(email, values.pin, {
			onSuccess: () => {
				form.reset()
			},
			onError: (error: unknown) => {
				console.error("Erreur lors de la vérification du code OTP :", error)
			}
		})
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className=" max-w-md w-full bg-white p-10 rounded-3xl text-neutral-high">
				<div className="space-y-3 mb-5">
					<h1 className="text-xl font-semibold">Confirmez votre identité</h1>
					<p className="text-sm">Un code de validation a été envoyé à votre adresse mail. Saisissez-le pour continuer</p>
				</div>
				<div className="space-y-5">
					<FormField
						control={form.control}
						name="pin"
						render={({ field }) => (
							<FormItem>
								<FormControl className="mt-1.5 mb-5">
									<InputOTP maxLength={5} {...field}>
										<InputOTPGroup>
											<InputOTPSlot index={0} />
											<InputOTPSlot index={1} />
											<InputOTPSlot index={2} />
											<InputOTPSlot index={3} />
											<InputOTPSlot index={4} />
										</InputOTPGroup>
									</InputOTP>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<Button type="submit" className="w-full mt-10 h-10" disabled={verifyIsLoading}>
					{verifyIsLoading ? <Spinner className="text-white" /> : "Confirmer"}
				</Button>
				<Button variant="ghost" className="w-full mt-2 bg-transparent h-10" asChild>
					<Link href="/login">
						Se connecter ici
					</Link>
				</Button>
			</form>
		</Form>
	)
}

export default OTPVerificationForm