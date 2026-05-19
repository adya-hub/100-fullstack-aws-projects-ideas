import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contract Lifecycle Management",
  description: "Contract authoring, negotiations, approvals, obligations, and renewals.",
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
