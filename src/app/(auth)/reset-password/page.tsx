"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useServerAction } from "zsa-react";

import LoadingButton from "@/components/LoadingButton";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ValidationError } from "@/lib/errors";

import AuthCard from "../components/AuthCard";
import { AUTH_URI } from "../constants";
import { resetPasswordAction } from "./actions";
import { ResetPasswordPayload, ResetPasswordSchema } from "./validators";

const ResetPasswordPage = () => {
  const searchParams = useSearchParams();

  const form = useForm<ResetPasswordPayload>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      token: searchParams.get("token") ?? "",
      password: "test123",
      passwordConfirmation: "test123",
    },
  });

  const { execute, isPending } = useServerAction(resetPasswordAction, {
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
    onSuccess() {
      toast.success("Password changed!");
    },
  });

  return (
    <AuthCard
      headerLabel={<h1 className={"text-3xl font-semibold"}>Enter a new Password</h1>}
      bottomButtonLabel="Don't have an account?"
      bottomButtonHref={AUTH_URI.signUp}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit((v) => execute(v))} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isPending} placeholder="******" type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="passwordConfirmation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password Confirmation</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isPending} placeholder="******" type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <LoadingButton type="submit" loading={isPending} className="w-full">
            Change Password
          </LoadingButton>
        </form>
      </Form>
    </AuthCard>
  );
};

export default ResetPasswordPage;
