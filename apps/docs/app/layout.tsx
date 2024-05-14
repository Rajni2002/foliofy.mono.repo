import type { Metadata } from "next";
import "./globals.css";
import "@foliofy/ui/index.css"

export const metadata: Metadata = {
  title: "Foliofy",
  description: "Build & deploy your modern portfolio in 60 seconds",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body >{children}</body>
    </html>
  );
}
