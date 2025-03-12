import { z } from "zod";

export const CreateCategoryFormSchema = z.object({
  name: z.string().min(1),
  color: z.string().min(1),
});

export const UpdateCategoryFormSchema = z.object({
  name: z.string().min(1),
  color: z.string().min(1),
});
