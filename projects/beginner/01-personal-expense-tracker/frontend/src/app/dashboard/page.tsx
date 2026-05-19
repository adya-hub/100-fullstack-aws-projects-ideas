"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { api, type Expense, type Summary } from "@/lib/api";

const CATEGORIES = ["Food", "Transport", "Housing", "Entertainment", "Health", "Other"];

export default function DashboardPage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    try {
      const [list, sum] = await Promise.all([
        api<{ expenses: Expense[] }>("/api/v1/expenses"),
        api<Summary>("/api/v1/expenses/summary"),
      ]);
      setExpenses(list.expenses);
      setSummary(sum);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function addExpense(e: React.FormEvent) {
    e.preventDefault();
    await api("/api/v1/expenses", {
      method: "POST",
      body: JSON.stringify({ amount: Number(amount), category, description }),
    });
    setAmount("");
    setDescription("");
    await load();
  }

  async function removeExpense(id: string) {
    await api(`/api/v1/expenses/${id}`, { method: "DELETE" });
    await load();
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <header className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h1 className="text-3xl font-semibold">Expense Dashboard</h1>
          <p className="mt-1 text-white/60">
            {summary ? `Total this month: $${summary.total.toFixed(2)}` : "Loading…"}
          </p>
        </motion.div>
      </header>

      <div className="grid gap-8 lg:grid-cols-3">
        <motion.form
          onSubmit={addExpense}
          className="glass space-y-4 p-6 lg:col-span-1"
          whileHover={{ y: -2 }}
        >
          <h2 className="font-medium">Add expense</h2>
          <input
            className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2"
            placeholder="Amount"
            type="number"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
          <select
            className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <input
            className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2"
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button type="submit" className="w-full rounded-xl bg-primary py-2 font-medium">
            Save expense
          </button>
        </motion.form>

        <section className="space-y-6 lg:col-span-2">
          {summary && (
            <div className="grid gap-4 sm:grid-cols-3">
              {summary.byCategory.slice(0, 3).map((row) => (
                <motion.div key={row.category} className="glass p-4" whileHover={{ y: -2 }}>
                  <p className="text-sm text-white/60">{row.category}</p>
                  <p className="text-2xl font-semibold">${row.total.toFixed(2)}</p>
                </motion.div>
              ))}
            </div>
          )}

          <motion.div className="glass overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-white/10 text-white/60">
                <tr>
                  <th className="p-4">Date</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Description</th>
                  <th className="p-4 text-right">Amount</th>
                  <th className="p-4" />
                </tr>
              </thead>
              <tbody>
                {loading && (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-white/50">
                      Loading expenses…
                    </td>
                  </tr>
                )}
                {error && (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-red-400">
                      {error} — <a href="/auth/login">Sign in</a>
                    </td>
                  </tr>
                )}
                {!loading &&
                  expenses.map((ex) => (
                    <tr key={ex.id} className="border-t border-white/5">
                      <td className="p-4">{ex.spentAt}</td>
                      <td className="p-4">{ex.category}</td>
                      <td className="p-4">{ex.description ?? "—"}</td>
                      <td className="p-4 text-right font-medium">${ex.amount.toFixed(2)}</td>
                      <td className="p-4 text-right">
                        <button
                          type="button"
                          onClick={() => removeExpense(ex.id)}
                          className="text-red-400 hover:underline"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </motion.div>
        </section>
      </div>
    </main>
  );
}
