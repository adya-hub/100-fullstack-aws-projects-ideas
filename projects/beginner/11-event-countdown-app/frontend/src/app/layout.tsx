import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Event Countdown Planner",
  description: "Count down to events with shared calendars and notification reminders.",
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
