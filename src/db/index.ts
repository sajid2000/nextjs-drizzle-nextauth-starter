import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

import { env } from "@/env";

import * as schema from "./schema";

export const client = createClient({
  url: env.DATABASE_URL,
  authToken: env.DB_AUTH_TOKEN,
});

export const db = drizzle(client, { schema });

export async function createTransaction<T extends typeof db>(cb: (trx: T) => void) {
  await db.transaction(cb as any);
}
