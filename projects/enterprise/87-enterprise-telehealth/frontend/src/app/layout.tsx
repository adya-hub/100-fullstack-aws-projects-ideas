import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Telehealth Enterprise Platform",
  description: "Video visits, scheduling, EHR integration patterns, and prescriptions.",
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
