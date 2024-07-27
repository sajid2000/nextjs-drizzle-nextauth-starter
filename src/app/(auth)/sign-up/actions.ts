"use server";

import { rateLimitByKey } from "@/lib/rate-limiter";
import { unauthenticatedAction } from "@/lib/safe-action";
import { signUpUser } from "@/services/authService";

import { RegisterSchema } from "./validators";

export const signUpAction = unauthenticatedAction
  .createServerAction()
  .input(RegisterSchema)
  .handler(async ({ input }) => {
    await rateLimitByKey({ key: "register", limit: 3, window: 10000 });

    return await signUpUser(input);
  });
