import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Enterprise Data Lake Platform",
  description: "Ingest, catalog, and query organizational data with governance controls.",
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
