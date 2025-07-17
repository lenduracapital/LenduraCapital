import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "./schema";

neonConfig.webSocketConstructor = ws;

if (!process.env.DATABASE_URL) {
  console.error(
    "❌ DATABASE_URL must be set. Did you forget to provision a database?",
  );
  // In deployment, this might cause server startup to fail
  // Let's log the error but allow server to start for debugging
  console.error("⚠️ Server will start but database operations will fail");
}

export const pool = new Pool({ connectionString: process.env.DATABASE_URL });
export const db = drizzle({ client: pool, schema });