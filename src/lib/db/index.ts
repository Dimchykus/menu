import { PostgresJsDatabase, drizzle } from "drizzle-orm/postgres-js";
import { config } from "dotenv";
import postgres from "postgres";
import * as schema from "./schema";

config({ path: ".env.local" });

const client = postgres(
  "postgresql://postgres:postgres@127.0.0.1:54322/postgres",
);

export const db = drizzle<typeof schema>(client);

declare global {
  const db: PostgresJsDatabase<typeof schema>;
}
