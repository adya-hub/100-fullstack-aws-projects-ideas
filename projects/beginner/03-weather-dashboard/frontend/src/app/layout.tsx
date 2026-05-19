import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Weather Intelligence Dashboard",
  description: "Location-based forecasts with saved cities and severe weather alerts.",
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
