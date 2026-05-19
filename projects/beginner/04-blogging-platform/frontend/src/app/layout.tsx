import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Modern Blogging Platform",
  description: "Publish markdown articles with tags, comments, and SEO-friendly pages.",
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
