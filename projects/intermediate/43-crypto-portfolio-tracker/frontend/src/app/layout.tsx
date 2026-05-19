import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Crypto Portfolio Tracker",
  description: "Track holdings, PnL, price alerts, and exchange API sync.",
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
