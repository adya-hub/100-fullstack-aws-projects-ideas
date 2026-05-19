import { Pool } from "pg";
import { logger } from "../lib/logger";

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 10,
});

pool.on("error", (err) => logger.error({ err }, "Unexpected PostgreSQL error"));

export async function initDb(): Promise<void> {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS expenses (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id TEXT NOT NULL,
      amount DECIMAL(12,2) NOT NULL CHECK (amount > 0),
      category TEXT NOT NULL,
      description TEXT,
      spent_at DATE NOT NULL DEFAULT CURRENT_DATE,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
    CREATE INDEX IF NOT EXISTS idx_expenses_user_spent ON expenses(user_id, spent_at DESC);
  `);
}
