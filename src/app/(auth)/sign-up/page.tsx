"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useServerAction } from "zsa-react";

import LoadingButton from "@/components/LoadingButton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import config from "@/config";
import { ValidationError } from "@/lib/errors";

import AuthCard from "../components/AuthCard";
import { AUTH_URI } from "../constants";
import { signUpAction } from "./actions";
import { RegisterPayload, RegisterSchema } from "./validators";

const RegisterPage = () => {
  const form = useForm<RegisterPayload>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "Sajid",
      email: "test@test.com",
      password: "test123",
    },
  });

  const { execute, isPending, isSuccess } = useServerAction(signUpAction, {
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
      headerLabel={
        <>
          <h1 className={"text-3xl font-semibold"}>Register to {config.appName}</h1>
          <p className="text-sm text-muted-foreground">Choose your preferred sign up method</p>
        </>
      }
      bottomButtonLabel="Already have an account?"
      bottomButtonHref={AUTH_URI.signIn}
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit((v) => execute(v))} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isPending} placeholder="Jhon Doe" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
          </div>
          {isSuccess && (
            <Alert variant="success">
              <AlertTitle>Email sent!</AlertTitle>
              <AlertDescription>Check your email to confirm.</AlertDescription>
            </Alert>
          )}
          <LoadingButton type="submit" loading={isPending} className="w-full">
            Register
          </LoadingButton>
        </form>
      </Form>
    </AuthCard>
  );
};

export default RegisterPage;
