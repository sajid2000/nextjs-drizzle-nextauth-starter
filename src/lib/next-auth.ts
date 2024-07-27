import { DrizzleAdapter } from "@auth/drizzle-adapter";
import bcrypt from "bcryptjs";
import NextAuth, { DefaultSession } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";
import Credentials from "next-auth/providers/credentials";
import GoogleAuthProviders from "next-auth/providers/google";
import Resend from "next-auth/providers/resend";

import authConfig from "@/auth";
import { db } from "@/db";
import { env } from "@/env";
import { ApplicationError } from "@/lib/errors";
import { getUser, getUserByEmail } from "@/repositories/users";

export type ExtendedUser = DefaultSession["user"] & {
  // role: (typeof roleEnum.enumValues)[number];
  isOAuth: boolean;
  is2FAEnabled: boolean;
  is2FAConfirmed: boolean;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    // role: (typeof roleEnum.enumValues)[number];
    isOAuth: boolean;
    is2FAEnabled: boolean;
    is2FAConfirmed: boolean;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  adapter: DrizzleAdapter(db),
  session: { strategy: "jwt" },
  providers: [
    Resend({
      from: env.EMAIL_FROM_ADDRESS,
    }),
    GoogleAuthProviders({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {
          required: true,
          type: "text",
        },
        password: {
          required: true,
          type: "password",
        },
      },
      authorize: async (credentials) => {
        const { email, password } = credentials as { email: string; password: string };

        // logic to verify if user exists
        const user = await getUserByEmail(email);

        if (!user || !user.password) {
          // No user found, so this is their first attempt to login
          // meaning this is also the place you could do registration
          throw new Error("User not found.");
        }

        // logic to salt and hash password
        const passwordsMatch = await bcrypt.compare(password, user.password);

        // return user object with the their profile data
        if (passwordsMatch) return user;

        throw new ApplicationError("Invalid credentials");
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (!user.id) return false;

      try {
        // Allow OAuth without email verification
        if (account?.provider !== "credentials") return true;

        const existingUser = await getUser(user.id);

        // Prevent sign in without email verification
        if (!existingUser?.emailVerified) return false;

        return true;
      } catch (error) {
        return false;
      }
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email || "";
        // session.user.role = token.role;
        session.user.isOAuth = token.isOAuth;
        session.user.is2FAEnabled = token.is2FAEnabled;
        session.user.is2FAConfirmed = token.is2FAConfirmed;
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUser(token.sub);

      if (!existingUser) return token;

      // token.isOAuth = !!existingAccount;
      token.name = existingUser.name;
      token.email = existingUser.email;
      // token.role = existingUser.role;
      // token.is2FAEnabled = existingUser.isTwoFactorEnabled;
      token.is2FAConfirmed = false;

      return token;
    },
  },
});
