import * as z from "zod";

export const ResetPasswordSchema = z
  .object({
    token: z.string(),
    password: z.string().min(6),
    passwordConfirmation: z.string().min(6),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: ["passwordConfirmation"],
  });

export type ResetPasswordPayload = z.infer<typeof ResetPasswordSchema>;
