"use server";

import { rateLimitByKey } from "@/lib/rate-limiter";
import { unauthenticatedAction } from "@/lib/safe-action";
import { forgotPassword } from "@/services/authService";

import { ForgotPasswordSchema } from "./validators";

export const forgotPasswordAction = unauthenticatedAction
  .createServerAction()
  .input(ForgotPasswordSchema)
  .handler(async ({ input }) => {
    await rateLimitByKey({ key: input.email, limit: 3, window: 10000 });

    await forgotPassword(input.email);
  });
