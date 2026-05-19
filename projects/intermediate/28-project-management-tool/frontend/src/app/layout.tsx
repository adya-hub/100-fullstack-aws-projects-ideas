import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Project Management SaaS",
  description: "Kanban boards, sprints, time tracking, and team collaboration.",
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
