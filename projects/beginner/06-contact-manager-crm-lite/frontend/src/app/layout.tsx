import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Manager CRM Lite",
  description: "Manage contacts, notes, and follow-up reminders for small businesses.",
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
