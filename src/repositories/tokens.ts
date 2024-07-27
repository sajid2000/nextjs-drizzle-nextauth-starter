import { eq } from "drizzle-orm";

import { db } from "@/db";
import * as dbTable from "@/db/schema";

export async function getVerifyToken(token: string) {
  return await db.query.verificationTokens.findFirst({
    where: eq(dbTable.verificationTokens.token, token),
  });
}

export async function getVerifyTokenByEmail(email: string) {
  return await db.query.verificationTokens.findFirst({
    where: eq(dbTable.verificationTokens.identifier, email),
  });
}

export async function insertVerifyToken({ email, expiresAt, token }: { email: string; token: string; expiresAt: Date }) {
  await db.insert(dbTable.verificationTokens).values({
    identifier: email,
    expires: expiresAt,
    token,
  });

  return token;
}

export async function deleteVerifyToken(email: string) {
  await db.delete(dbTable.verificationTokens).where(eq(dbTable.verificationTokens.identifier, email));
}

export async function getPasswordResetToken(token: string) {
  return await db.query.resetTokens.findFirst({
    where: eq(dbTable.resetTokens.token, token),
  });
}

export async function getPasswordResetTokenByEmail(email: string) {
  return await db.query.resetTokens.findFirst({
    where: eq(dbTable.resetTokens.email, email),
  });
}

export async function insertPasswordResetToken({ email, expiresAt, token }: { email: string; token: string; expiresAt: Date }) {
  await db.insert(dbTable.resetTokens).values({
    email,
    expiresAt,
    token,
  });

  return token;
}

export async function deletePasswordResetToken(email: string) {
  await db.delete(dbTable.resetTokens).where(eq(dbTable.resetTokens.email, email));
}
