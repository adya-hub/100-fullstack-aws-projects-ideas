import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Travel Itinerary Planner",
  description: "Plan trips with flights, hotels, activities, and collaborative editing.",
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
