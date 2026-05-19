import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Event Ticketing Platform",
  description: "Event creation, seat selection, ticketing, and QR check-in.",
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
