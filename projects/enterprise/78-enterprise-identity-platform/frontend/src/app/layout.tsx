import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Enterprise Identity Platform",
  description: "SSO, SCIM provisioning, MFA policies, and access reviews.",
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
