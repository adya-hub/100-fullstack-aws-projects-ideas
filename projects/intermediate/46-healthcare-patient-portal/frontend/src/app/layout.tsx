import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Healthcare Patient Portal",
  description: "Appointments, prescriptions, lab results, and secure messaging.",
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
