import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DevOps Monitoring Platform",
  description: "Uptime checks, log aggregation, alerts, and incident management.",
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
