import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Data Pipeline Orchestrator",
  description: "Define ETL pipelines, schedule runs, and monitor data quality.",
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
