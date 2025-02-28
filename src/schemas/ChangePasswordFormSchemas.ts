import { z } from "zod";

export const ChangePasswordFormSchema = z.object({
  newPassword: z.string().min(6),
  confirmNewPassword: z.string().min(6),
});
