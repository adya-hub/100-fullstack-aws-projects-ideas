import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Multi-Region SaaS Platform",
  description: "Globally distributed SaaS with data residency, replication, and failover.",
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
