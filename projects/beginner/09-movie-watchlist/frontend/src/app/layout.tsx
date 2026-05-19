import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Movie Watchlist & Reviews",
  description: "Track films to watch, ratings, and personalized recommendations.",
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
