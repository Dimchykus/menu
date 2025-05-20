import { defineConfig } from "drizzle-kit";
import { config } from 'dotenv';

config({ path: '.env.local' });


export default defineConfig({
  schema: "./src/lib/db/schema",
  out: "./migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: 'postgresql://postgres:postgres@127.0.0.1:54322/postgres',
  },
});
