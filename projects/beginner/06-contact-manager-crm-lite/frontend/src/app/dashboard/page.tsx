"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type Metrics = { activeUsers: number; revenue: number; growth: number };

export default function DashboardPage() {
  const [metrics, setMetrics] = useState<Metrics | null>(null);

  useEffect(() => {
    const base = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";
    fetch(`${base}/api/v1/dashboard`, {
      headers: { Authorization: "Bearer demo-token" },
    })
      .then((r) => r.json())
      .then((d) => setMetrics(d.metrics))
      .catch(() => setMetrics({ activeUsers: 0, revenue: 0, growth: 0 }));
  }, []);

  const cards = [
    ["Active Users", metrics?.activeUsers ?? "—"],
    ["Revenue", metrics?.revenue ?? "—"],
    ["Growth %", metrics?.growth ?? "—"],
  ] as const;

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="text-3xl font-semibold">Dashboard</h1>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mt-8 grid gap-6 md:grid-cols-3"
      >
        {cards.map(([label, value]) => (
          <motion.div key={label} className="glass p-6" whileHover={{ y: -4 }}>
            <p className="text-sm text-white/60">{label}</p>
            <p className="mt-2 text-3xl font-semibold">{value}</p>
          </motion.div>
        ))}
      </motion.div>
    </main>
  );
}
