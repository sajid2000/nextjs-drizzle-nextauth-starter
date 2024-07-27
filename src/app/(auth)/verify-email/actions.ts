"use server";

import { z } from "zod";

import { rateLimitByKey } from "@/lib/rate-limiter";
import { unauthenticatedAction } from "@/lib/safe-action";
import { verifyEmail } from "@/services/authService";

export const verifyEmailAction = unauthenticatedAction
  .createServerAction()
  .input(z.object({ token: z.string() }))
  .handler(async ({ input }) => {
    await rateLimitByKey({ key: input.token, limit: 3, window: 10000 });

    await verifyEmail(input.token);
  });
