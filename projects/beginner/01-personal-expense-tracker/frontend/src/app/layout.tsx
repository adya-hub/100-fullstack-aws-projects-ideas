import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Personal Expense Tracker",
  description: "Track daily spending with categories, budgets, and monthly reports.",
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
