import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Warehouse Inventory Management",
  description: "SKU tracking, stock alerts, purchase orders, and barcode scanning.",
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
