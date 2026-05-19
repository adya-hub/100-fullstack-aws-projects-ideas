import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Image Generation Studio",
  description: "Text-to-image generation with galleries, styles, and credit system.",
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
