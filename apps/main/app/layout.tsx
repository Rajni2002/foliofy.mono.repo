import type { Metadata } from "next";
import "@/styles/globals.css";
import "@foliofy/ui/index.css"
import siteConfig from "@/config/site-config";

// fonts
import { Inter } from 'next/font/google'
import { ThemeProvider } from "@/components/theme-provider";
import { mergeCN } from "@foliofy/utils";
import { ThemeTypeProvider } from "@foliofy/ui/theme-provider";
import Navbar from "@/components/navbar";
import { Toaster } from "@foliofy/ui/toaster";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  // metadataBase: new URL(siteConfig.url),
  description: siteConfig.description,
  // keywords: [
  //   "Foliofy",
  //   "Build modern portfolio",
  //   "Deploy portfolio fast",
  //   "60-second portfolio",
  //   "Instant portfolio creation",
  //   "Modern portfolio builder",
  //   "Quick portfolio deployment",
  //   "Portfolio in a minute",
  //   "Fast portfolio setup",
  //   "Efficient portfolio tool"
  // ],
  // authors: [
  //   {
  //     name: siteConfig.creator,
  //     url: siteConfig.url,
  //   },
  // ],
  // creator: siteConfig.creator,
  // openGraph: {
  //   type: "website",
  //   locale: "en_US",
  //   url: siteConfig.url,
  //   title: siteConfig.name,
  //   description: siteConfig.description,
  //   siteName: siteConfig.name,
  //   images: [
  //     {
  //       url: siteConfig.ogImage,
  //       width: 1200,
  //       height: 630,
  //       alt: siteConfig.name,
  //     },
  //   ],
  // },
  // twitter: {
  //   card: "summary_large_image",
  //   title: siteConfig.name,
  //   description: siteConfig.description,
  //   images: [siteConfig.ogImage],
  //   creator: "@rajni2k2",
  // },
  // icons: {
  //   icon: "/favicon.ico",
  // },
  // manifest: `${siteConfig.url}/site.webmanifest`,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={mergeCN(inter.className, "relative min-h-screen px-5 sm:px-20 py-10 bg-gray-100 text-gray-900 dark:bg-black/60 dark:text-gray-300 antialiased")}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ThemeTypeProvider>
            <Navbar />
            {children}
            <Toaster />
          </ThemeTypeProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
