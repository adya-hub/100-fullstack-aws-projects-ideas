import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HR Management System",
  description: "Employee records, leave management, payroll integration, and org chart.",
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
