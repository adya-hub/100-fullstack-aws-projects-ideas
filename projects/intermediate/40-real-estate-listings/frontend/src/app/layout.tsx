import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Real Estate Listings Portal",
  description: "Property listings, advanced search, virtual tours, and agent CRM.",
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
