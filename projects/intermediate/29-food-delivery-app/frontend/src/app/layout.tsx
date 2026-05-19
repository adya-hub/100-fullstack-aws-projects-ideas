import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Food Delivery Platform",
  description: "Restaurant menus, cart, delivery tracking, and driver assignment.",
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
