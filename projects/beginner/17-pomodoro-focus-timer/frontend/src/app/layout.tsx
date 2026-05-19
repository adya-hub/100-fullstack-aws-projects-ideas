import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pomodoro Focus Studio",
  description: "Focus sessions with statistics, ambient sounds, and task integration.",
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
