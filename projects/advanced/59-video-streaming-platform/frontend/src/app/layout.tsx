import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Video Streaming Platform",
  description: "Upload, transcode, and stream video with adaptive bitrate playback.",
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
