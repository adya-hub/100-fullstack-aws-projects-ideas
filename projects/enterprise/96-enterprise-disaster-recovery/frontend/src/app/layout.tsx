import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disaster Recovery Orchestrator",
  description: "Runbooks, failover drills, RTO/RPO tracking, and automated recovery.",
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
