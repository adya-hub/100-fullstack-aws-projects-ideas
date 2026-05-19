import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Enterprise API Service Mesh",
  description: "Service discovery, mTLS, traffic policies, and observability for microservices.",
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
