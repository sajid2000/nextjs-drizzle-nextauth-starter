import { createServerActionProcedure, ZSAError } from "zsa";

import { env } from "@/env";
import { ApplicationError, AuthenticationError, ValidationError } from "@/lib/errors";

import { getCurrentUser } from "./session";

function shapeErrors({ err }: any) {
  if (err instanceof ValidationError) {
    return {
      name: "ValidationError",
      message: err.message,
      fieldErrors: err.fieldErrors,
    };
  }

  if (err instanceof ZSAError && err.inputParseErrors?.fieldErrors) {
    return {
      name: "ValidationError",
      message: "Validation failed!",
      fieldErrors: err.inputParseErrors.fieldErrors,
    };
  }

  const isAllowedError = err instanceof ApplicationError;
  const isDev = env.NODE_ENV === "development";

  if (isAllowedError || isDev) {
    return {
      code: err.code ?? "ERROR",
      message: err.message,
    };
  } else {
    return {
      code: "ERROR",
      message: "Something went wrong",
    };
  }
}

export const authenticatedAction = createServerActionProcedure()
  .experimental_shapeError(shapeErrors)
  .handler(async () => {
    const user = await getCurrentUser();

    if (!user) throw new AuthenticationError();

    return { user };
  });

export const unauthenticatedAction = createServerActionProcedure()
  .experimental_shapeError(shapeErrors)
  .handler(async () => {
    return { user: undefined };
  });
