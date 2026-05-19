import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Parking Spot Finder",
  description: "Find and share available parking spots with time-limited reservations.",
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
