import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Freelancer Invoice Generator",
  description: "Create professional invoices with PDF export and payment tracking.",
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
