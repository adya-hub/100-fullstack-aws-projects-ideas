import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Voice Assistant Platform",
  description: "Conversational voice agent with tools, memory, and custom personas.",
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
