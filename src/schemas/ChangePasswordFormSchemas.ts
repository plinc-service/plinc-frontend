import { z } from "zod";

export const ChangePasswordFormSchema = z
  .object({
    newPassword: z
      .string()
      .min(1, "Ce champ est obligatoire")
      .min(8, "Le mot de passe doit contenir au moins 8 caractères"),
    confirmNewPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmNewPassword"],
  });
