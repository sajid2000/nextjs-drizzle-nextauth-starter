"use server";

import { rateLimitByKey } from "@/lib/rate-limiter";
import { unauthenticatedAction } from "@/lib/safe-action";
import { changePassword } from "@/services/authService";

import { ResetPasswordSchema } from "./validators";

export const resetPasswordAction = unauthenticatedAction
  .createServerAction()
  .input(ResetPasswordSchema)
  .handler(async ({ input }) => {
    await rateLimitByKey({ key: "change-password", limit: 2, window: 10000 });

    await changePassword(input);
  });
