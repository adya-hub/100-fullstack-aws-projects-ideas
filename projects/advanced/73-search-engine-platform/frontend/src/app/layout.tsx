import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Custom Search Engine Platform",
  description: "Crawl, index, and search documents with relevance tuning.",
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
