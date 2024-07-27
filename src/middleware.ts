import NextAuth from "next-auth";

import { AUTH_URI, DEFAULT_LOGIN_REDIRECT } from "./app/(auth)/constants";
import authConfig from "./auth";

const authRoutes = Object.values(AUTH_URI);
const publicRoutes = ["/"];

export const { auth: middleware } = NextAuth({
  ...authConfig,
  callbacks: {
    authorized: async ({ auth, request }) => {
      const { nextUrl } = request;
      console.log(nextUrl.pathname);

      const isAuthRoute = authRoutes.includes(nextUrl.pathname as any);
      const isPublicRoute = publicRoutes.includes(nextUrl.pathname);

      if (isPublicRoute) return true;

      if (isAuthRoute) {
        if (auth?.user) {
          return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
        }

        return true;
      }

      if (auth?.user) return true;

      let callbackUrl = nextUrl.pathname;

      if (nextUrl.search) {
        callbackUrl += nextUrl.search;
      }

      const encodedCallbackUrl = encodeURIComponent(callbackUrl);

      return Response.redirect(new URL(`${AUTH_URI.signIn}?callbackUrl=${encodedCallbackUrl}`, nextUrl));
    },
  },
});

export const config = {
  matcher: ["/((?!api|public|_next/static|_next/image|favicon.ico).*)"],
};
