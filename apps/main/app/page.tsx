"use client"

//components
import Navbar from "@/components/navbar";

// context & configs
import { ThemeProvider } from "@foliofy/ui/theme-provider";

// utils
import { mergeCN } from "@foliofy/utils";

// fonts
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
    return (
        <ThemeProvider theme="yellow" radius={1.0}
            className={
                mergeCN(
                    "min-h-screen bg-background text-gray-900 dark:bg-black dark:text-gray-100 antialiased"
                    , inter.className
                )}>
            <Navbar currPath="/" />
        </ThemeProvider>

    );
}
