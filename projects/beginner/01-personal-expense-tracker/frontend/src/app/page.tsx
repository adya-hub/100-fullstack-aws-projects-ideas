"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-20">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass p-12 text-center"
      >
        <p className="text-sm font-medium uppercase tracking-widest text-primary">
          AWS Full Stack · Beginner
        </p>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight">
          Personal Expense Tracker
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-white/70">
          Track spending by category, visualize monthly budgets, and export reports.
          Built with Next.js, Express, PostgreSQL on RDS, and Cognito-ready auth.
        </p>
        <motion.div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href="/auth/login"
            className="rounded-xl bg-primary px-8 py-3 font-medium text-white shadow-lg shadow-primary/30"
          >
            Sign in
          </Link>
          <Link
            href="/dashboard"
            className="rounded-xl border border-white/20 px-8 py-3 font-medium hover:bg-white/5"
          >
            Open dashboard
          </Link>
        </motion.div>
      </motion.section>
    </main>
  );
}
