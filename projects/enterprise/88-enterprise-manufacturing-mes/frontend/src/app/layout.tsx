import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manufacturing MES Lite",
  description: "Production orders, work centers, quality checks, and OEE dashboards.",
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
