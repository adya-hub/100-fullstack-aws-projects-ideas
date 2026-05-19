import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Synced Notes Application",
  description: "Rich text notes with folders, search, and cross-device sync.",
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
