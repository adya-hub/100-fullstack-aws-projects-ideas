import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ride Booking Platform",
  description: "Request rides, driver matching, fare estimation, and trip history.",
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
