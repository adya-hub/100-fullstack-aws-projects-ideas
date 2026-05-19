import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Freelance Services Marketplace",
  description: "Gig listings, proposals, escrow payments, and milestone delivery.",
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
