import { z } from "zod";

export const CreateCategoryFormSchema = z.object({
  name: z.string().min(1, { message: "Le nom est requis" }),
  color: z.string().min(1, { message: "La couleur est requise" }),
});

export const UpdateCategoryFormSchema = z.object({
  name: z.string().min(1, { message: "Le nom est requis" }),
  color: z.string().min(1, { message: "La couleur est requise" }),
});
