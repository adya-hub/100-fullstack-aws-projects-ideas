import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Legal Document Manager",
  description: "Contract storage, e-signatures, version control, and audit trails.",
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
