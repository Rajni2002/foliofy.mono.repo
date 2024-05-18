import type { Metadata } from "next";
import "./globals.css";
import "@foliofy/ui/index.css"

export const metadata: Metadata = {
  title: "Foliofy",
  description: "Build & deploy your modern portfolio in 60 seconds",
  keywords: [
    "Foliofy",
    "Build modern portfolio",
    "Deploy portfolio fast",
    "60-second portfolio",
    "Instant portfolio creation",
    "Modern portfolio builder",
    "Quick portfolio deployment",
    "Portfolio in a minute",
    "Fast portfolio setup",
    "Efficient portfolio tool"
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-black">{children}</body>
    </html>
  );
}
