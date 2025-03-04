import { z } from "zod";

export const ForgotPasswordFormSchema = z.object({
  email: z.string().email({
    message: "Veuillez entrer une adresse email valide.",
  }),
});
