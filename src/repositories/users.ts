import { eq } from "drizzle-orm";

import { db } from "@/db";
import * as dbTable from "@/db/schema";
import { UserID } from "@/types";

export async function deleteUser(userId: UserID) {
  await db.delete(dbTable.users).where(eq(dbTable.users.id, userId));
}

export async function getUser(userId: UserID) {
  const user = await db.query.users.findFirst({
    where: eq(dbTable.users.id, userId),
  });

  return user;
}

export async function createUser(data: Omit<typeof dbTable.users.$inferInsert, "id">) {
  const [user] = await db.insert(dbTable.users).values(data).returning();

  return user;
}

export async function createMagicUser(email: string) {
  const [user] = await db
    .insert(dbTable.users)
    .values({
      email,
      emailVerified: new Date(),
    })
    .returning();

  await db
    .insert(dbTable.accounts)
    .values({
      userId: user.id,
      type: "email",
      provider: "",
      providerAccountId: "",
    })
    .returning();

  return user;
}
export async function getUserByEmail(email: string) {
  const user = await db.query.users.findFirst({
    where: eq(dbTable.users.email, email),
  });

  return user;
}

export async function getMagicUserAccountByEmail(email: string) {
  const user = await db.query.users.findFirst({
    where: eq(dbTable.users.email, email),
  });

  return user;
}

export async function updateUser(userId: UserID, data: Partial<Omit<typeof dbTable.users.$inferInsert, "id">>) {
  await db.update(dbTable.users).set(data).where(eq(dbTable.users.id, userId));
}

export async function updateUserByEmail(email: string, data: Partial<Omit<typeof dbTable.users.$inferInsert, "id" | "email">>) {
  await db.update(dbTable.users).set(data).where(eq(dbTable.users.email, email));
}
