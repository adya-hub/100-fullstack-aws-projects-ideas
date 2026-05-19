import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pet Care & Health Tracker",
  description: "Track vet visits, medications, and care schedules for pets.",
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
