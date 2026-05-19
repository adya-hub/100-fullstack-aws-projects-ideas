import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Digital Banking Portal Lite",
  description: "Accounts, transfers, statements, and fraud alerts with audit trails.",
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
