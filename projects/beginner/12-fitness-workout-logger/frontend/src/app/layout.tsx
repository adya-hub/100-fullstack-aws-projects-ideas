import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fitness Workout Logger",
  description: "Log workouts, track PRs, and visualize strength progress over time.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
