"use client";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <motion.section
        initial={ opacity: 0, y: 16 }
        animate={ opacity: 1, y: 0 }
        className="glass p-10"
      >
        <p className="text-sm uppercase tracking-widest text-primary">AWS Full Stack</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight">Plant Care Assistant</h1>
        <p className="mt-4 max-w-2xl text-lg text-white/70">Watering schedules, plant identification, and care tips per species.</p>
        <motion.a
          href="/dashboard"
          whileHover={ scale: 1.02 }
          className="mt-8 inline-flex rounded-xl bg-primary px-6 py-3 font-medium text-white"
        >
          Open Dashboard
        </motion.a>
      </motion.section>
    </main>
  );
}
