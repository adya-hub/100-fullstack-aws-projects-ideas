import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "API Gateway Management Portal",
  description: "Manage APIs, keys, rate limits, analytics, and developer portal.",
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
