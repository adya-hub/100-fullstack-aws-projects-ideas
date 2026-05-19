import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Social Media Network",
  description: "Posts, feeds, follows, likes, comments, and notifications.",
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
