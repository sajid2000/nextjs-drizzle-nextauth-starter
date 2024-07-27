import { eq } from "drizzle-orm";

import { db } from "@/db";
import * as dbTable from "@/db/schema";
import { UserID } from "@/types";

export async function deleteAccount(userId: UserID) {
  await db.delete(dbTable.accounts).where(eq(dbTable.accounts.userId, userId));
}

export async function getAccount(userId: UserID) {
  const res = await db.query.accounts.findFirst({
    where: eq(dbTable.accounts.userId, userId),
  });

  return res;
}

export async function createAccount(data: Omit<typeof dbTable.accounts.$inferInsert, "id">) {
  const [res] = await db.insert(dbTable.accounts).values(data).returning();

  return res;
}

export async function updateAccount(userId: UserID, data: Omit<typeof dbTable.accounts.$inferInsert, "id">) {
  await db.update(dbTable.accounts).set(data).where(eq(dbTable.accounts.userId, userId));
}
