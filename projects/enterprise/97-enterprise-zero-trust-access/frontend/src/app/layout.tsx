import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Zero Trust Access Gateway",
  description: "Policy-based access to internal apps with device posture and session recording.",
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
