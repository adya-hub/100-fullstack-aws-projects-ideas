import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI SaaS Platform",
  description: "Multi-tenant AI workspace with model selection, usage billing, and API keys.",
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
