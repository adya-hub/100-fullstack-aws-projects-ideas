import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Supply Chain Control Tower",
  description: "End-to-end supply chain visibility, shipments, and supplier scorecards.",
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
