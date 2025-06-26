import { PostgresJsDatabase, drizzle } from "drizzle-orm/postgres-js";
import { config } from "dotenv";
import postgres from "postgres";
import * as schema from "./schema";

config({ path: ".env.local" });

const client = postgres(process.env.POSTGRES_URL!);

export const db = drizzle<typeof schema>(client);

declare global {
  const db: PostgresJsDatabase<typeof schema>;
}
