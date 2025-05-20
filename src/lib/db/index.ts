import { PostgresJsDatabase, drizzle } from "drizzle-orm/postgres-js";
import { config } from "dotenv";
import postgres from "postgres";
import * as schema from "./schema/user";

config({ path: ".env.local" }); // or .env.local

const client = postgres(
  "postgresql://postgres:postgres@127.0.0.1:54322/postgres",
);
export const db = drizzle({ client });

declare global {
  const database: PostgresJsDatabase<typeof schema> | undefined;
}
