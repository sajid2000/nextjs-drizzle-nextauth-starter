"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useServerAction } from "zsa-react";

import LoadingButton from "@/components/LoadingButton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ValidationError } from "@/lib/errors";

import AuthCard from "../components/AuthCard";
import { AUTH_URI } from "../constants";
import { forgotPasswordAction } from "./actions";
import { ForgotPasswordPayload, ForgotPasswordSchema } from "./validators";

const ForgotPasswordPage = () => {
  const form = useForm<ForgotPasswordPayload>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: "test@test.com",
    },
  });

  const { execute, isPending, isSuccess } = useServerAction(forgotPasswordAction, {
    onError: ({ err }) => {
      if (err.name === "ValidationError") {
        const error = err as ValidationError;

        if (error.fieldErrors) {
          Object.keys(error.fieldErrors || {}).forEach((key) => {
            form.setError(key as any, { message: (error.fieldErrors as any)[key][0] });
          });
        }
      } else {
        toast.error(err.message);
      }
    },
  });

  return (
    <AuthCard
      headerLabel={<h1 className={"text-3xl font-semibold"}>Forgot your password?</h1>}
      bottomButtonLabel="Back to login"
      bottomButtonHref={AUTH_URI.signIn}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit((v) => execute(v))} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isPending} placeholder="john@example.com" type="email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {isSuccess && (
            <Alert variant="success">
              <AlertTitle>Email sent!</AlertTitle>
              <AlertDescription>Check your email to reset password.</AlertDescription>
            </Alert>
          )}
          <LoadingButton type="submit" loading={isPending} className="w-full">
            Send reset link
          </LoadingButton>
        </form>
      </Form>
    </AuthCard>
  );
};

export default ForgotPasswordPage;
