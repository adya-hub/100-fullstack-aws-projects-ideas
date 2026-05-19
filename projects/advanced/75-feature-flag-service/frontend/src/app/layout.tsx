import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Feature Flag Service",
  description: "Toggle features, gradual rollouts, A/B tests, and audit logs.",
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
