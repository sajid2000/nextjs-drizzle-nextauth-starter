"use server";

import { signIn, signOut } from "@/lib/next-auth";

export const logout = async () => {
  await signOut({ redirect: true });
};

export const googleSignIn = async () => {
  await signIn("google");
}