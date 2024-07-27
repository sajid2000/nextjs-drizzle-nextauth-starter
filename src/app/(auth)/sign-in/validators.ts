import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});
export type LoginPayload = z.infer<typeof LoginSchema>;

export const MagicLinkSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});
export type MagicLinkPayload = z.infer<typeof MagicLinkSchema>;
