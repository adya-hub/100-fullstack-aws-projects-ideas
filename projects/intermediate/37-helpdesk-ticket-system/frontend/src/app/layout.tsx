import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Helpdesk Ticket System",
  description: "Support tickets, SLA tracking, agent assignment, and knowledge base.",
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
