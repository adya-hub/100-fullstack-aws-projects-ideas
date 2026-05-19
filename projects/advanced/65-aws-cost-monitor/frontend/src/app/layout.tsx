import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AWS Cost Monitoring Tool",
  description: "Cost breakdowns, budgets, anomaly detection, and optimization tips.",
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
