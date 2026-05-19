import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cloud File Storage System",
  description: "Upload, organize, share files with versioning and access controls.",
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
