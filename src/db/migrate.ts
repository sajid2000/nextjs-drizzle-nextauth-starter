import { migrate } from "drizzle-orm/libsql/migrator";

import { client, db } from ".";

import "dotenv/config";

(async () => {
  await migrate(db, { migrationsFolder: "./migrations" });
  client.close();
})();
