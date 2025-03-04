import { z } from "zod";

export const OtpVerificationFormSchema = z.object({
  pin: z.string().min(5, {
    message: "Le code PIN doit contenir au moins 5 chiffres.",
  }),
});
