"use server";

import { redirect } from "next/navigation";
import { AuthError } from "next-auth";

import { signIn } from "@/lib/next-auth";
import { rateLimitByKey } from "@/lib/rate-limiter";
import { unauthenticatedAction } from "@/lib/safe-action";
import { login } from "@/services/authService";

import { LoginSchema, MagicLinkSchema } from "./validators";

export const signInAction = unauthenticatedAction
  .createServerAction()
  .input(LoginSchema)
  .handler(async ({ input }) => {
    const { email, password } = input;

    await rateLimitByKey({ key: email, limit: 3, window: 10000 });

    await login(input);

    try {
      await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      redirect("/");
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case "CredentialsSignin":
            return { success: false, message: "Invalid credentials!" } as const;
          default:
            return { success: false, message: error.message } as const;
        }
      }

      throw error;
    }
  });

export const signInMagicLinkAction = unauthenticatedAction
  .createServerAction()
  .input(MagicLinkSchema)
  .handler(async ({ input }) => {
    const { email } = input;

    await rateLimitByKey({ key: email, limit: 3, window: 10000 });

    try {
      await signIn("resend", {
        email,
        redirect: false,
      });

      redirect("/");
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case "CredentialsSignin":
            return { success: false, message: "Invalid credentials!" } as const;
          default:
            return { success: false, message: error.message } as const;
        }
      }

      throw error;
    }
  });
