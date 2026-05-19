import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Appointment Scheduling SaaS",
  description: "Calendar booking, availability rules, reminders, and payments.",
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
