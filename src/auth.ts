import { NextAuthConfig } from "next-auth";

import { AUTH_URI } from "./app/(auth)/constants";

export default {
  pages: {
    signIn: AUTH_URI.signIn,
  },
  providers: [],
} satisfies NextAuthConfig;
