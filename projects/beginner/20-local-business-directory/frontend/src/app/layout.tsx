import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Local Business Directory",
  description: "Discover and review local businesses with maps and categories.",
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
