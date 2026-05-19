import { Router } from "express";
import { z } from "zod";
import { pool } from "../db/pool";

export const expensesRouter = Router();

const expenseSchema = z.object({
  amount: z.coerce.number().positive(),
  category: z.string().min(1).max(64),
  description: z.string().max(500).optional(),
  spentAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
});

expensesRouter.get("/", async (req, res, next) => {
  try {
    const userId = (req as any).user?.sub as string;
    const month = (req.query.month as string) ?? new Date().toISOString().slice(0, 7);
    const result = await pool.query(
      `SELECT id, amount::float, category, description, spent_at AS "spentAt", created_at AS "createdAt"
       FROM expenses
       WHERE user_id = $1 AND to_char(spent_at, 'YYYY-MM') = $2
       ORDER BY spent_at DESC, created_at DESC`,
      [userId, month],
    );
    res.json({ expenses: result.rows });
  } catch (e) {
    next(e);
  }
});

expensesRouter.get("/summary", async (req, res, next) => {
  try {
    const userId = (req as any).user?.sub as string;
    const month = (req.query.month as string) ?? new Date().toISOString().slice(0, 7);
    const result = await pool.query(
      `SELECT category, SUM(amount)::float AS total
       FROM expenses
       WHERE user_id = $1 AND to_char(spent_at, 'YYYY-MM') = $2
       GROUP BY category
       ORDER BY total DESC`,
      [userId, month],
    );
    const total = result.rows.reduce((sum, r) => sum + Number(r.total), 0);
    res.json({ month, total, byCategory: result.rows });
  } catch (e) {
    next(e);
  }
});

expensesRouter.post("/", async (req, res, next) => {
  try {
    const userId = (req as any).user?.sub as string;
    const body = expenseSchema.parse(req.body);
    const result = await pool.query(
      `INSERT INTO expenses (user_id, amount, category, description, spent_at)
       VALUES ($1, $2, $3, $4, COALESCE($5::date, CURRENT_DATE))
       RETURNING id, amount::float, category, description, spent_at AS "spentAt", created_at AS "createdAt"`,
      [userId, body.amount, body.category, body.description ?? null, body.spentAt ?? null],
    );
    res.status(201).json({ expense: result.rows[0] });
  } catch (e) {
    next(e);
  }
});

expensesRouter.delete("/:id", async (req, res, next) => {
  try {
    const userId = (req as any).user?.sub as string;
    const result = await pool.query(
      `DELETE FROM expenses WHERE id = $1 AND user_id = $2 RETURNING id`,
      [req.params.id, userId],
    );
    if (!result.rowCount) return res.status(404).json({ error: "Expense not found" });
    res.status(204).send();
  } catch (e) {
    next(e);
  }
});
