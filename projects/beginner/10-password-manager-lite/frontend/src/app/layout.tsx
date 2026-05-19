import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Password Vault Lite",
  description: "Encrypted credential storage with master password and breach alerts.",
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
