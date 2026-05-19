import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Serverless SaaS Platform",
  description: "Fully serverless multi-tenant SaaS with DynamoDB single-table design.",
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
