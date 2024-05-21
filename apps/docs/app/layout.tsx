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
  ],
  openGraph: {
    title: "Foliofy",
    description: "Build & deploy your modern portfolio in 60 seconds",
    images: {
      url: "/image/background/carvan.png",
      alt: "Carvan",
      width: 80,
      height: 40
    }
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta property="og:image" content="<generated>" />
        <meta property="og:image:type" content="<generated>" />
        <meta property="og:image:width" content="<generated>" />
        <meta property="og:image:height" content="<generated>" />
        <meta property="og:image:alt" content="About Foliofy" />
        <meta name="twitter:image" content="<generated>" />
        <meta name="twitter:image:type" content="<generated>" />
        <meta name="twitter:image:width" content="<generated>" />
        <meta name="twitter:image:height" content="<generated>" />
        <meta property="twitter:image:alt" content="About Foliofy" />
      </head>
      <body className="bg-black">{children}</body>
    </html>
  );
}
