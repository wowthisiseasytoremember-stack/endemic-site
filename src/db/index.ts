import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

let pool: Pool | undefined;

/**
 * Lazily initialize the site's Postgres/Drizzle client.
 *
 * Keeping initialization inside request-time code means static builds do not
 * require a live database. Reusing one capped pool per server process avoids
 * opening a new PostgreSQL pool on every request.
 */
export function getDb() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("DATABASE_URL is not configured for database-backed routes.");
  }

  pool ??= new Pool({
    connectionString,
    max: 5,
  });

  return drizzle(pool, { schema });
}
