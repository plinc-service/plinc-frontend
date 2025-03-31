import { z } from "zod";

export const rejectWithdrawalSchema = z.object({
  motif: z.string().min(2, { message: "La raison du refus est requis" }),
});

export const rejectServiceSchema = z.object({
  motif: z.string().min(2, { message: "La raison du refus est requis" }),
});
