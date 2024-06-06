"use client"
import React, { useEffect, useState } from 'react';
import { Amaranth } from 'next/font/google';

import { mergeCN as cn } from '@foliofy/utils';
import { MoonStarIcon, Sun } from '@foliofy/ui/icons';
import { useTheme } from 'next-themes';

const amaranth = Amaranth({ weight: "700", style: "italic", subsets: ["latin"] })

const nav_items: NavItem[] = [
    {
        name: "home",
        path: "/"
    },
    {
        name: "connect",
        path: "/connect"
    },
    {
        name: "blogs",
        path: "/blogs"
    },
    {
        name: "work",
        path: "/work"
    },
    {
        name: "story map",
        path: "/story-map"
    },
]

export type NavbarProps = {
    currPath: `/${string}`
}

export type NavItem = {
    name: string
    path: `/${string}`
}

const Navbar = ({ currPath }: NavbarProps) => {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false); // to safely show the UI for the 
    const [showMenu, setShowMenu] = useState<boolean>(false);

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    return (
        <nav className='mt-5'>
            <div className='flex'>
                <div className={cn("sm:block sm:w-auto h-full backdrop-blur-xl", showMenu ? "block absolute left-0 right-0 w-100 top-[12%]" : "hidden w-full")}>
                    <ul className="text-center font-medium flex flex-col py-4 sm:p-0 rounded-lg sm:flex-row sm:space-x-8 sm:mt-0 sm:border-0 bg-inherit">
                        {nav_items.map(({ name, path }) => (
                            <li key={Math.random()}>
                                <a href={path} className={cn("block py-2 text-gray-400 hover:text-gray-500", currPath === path ? "text-black dark:text-white after:content-['•'] after:text-primary after:relative after:top-4 after:right-6" : "")} aria-current="page">{name}</a>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="self-center hover:cursor-pointer hover:opacity-75 mx-3" onClick={
                    () => setTheme((theme === "dark" ? "light" : "dark"))
                }>
                    {
                        theme && (theme === "dark") ?
                            <MoonStarIcon color='white' />
                            :
                            <Sun color='black' />
                    }
                </div>
            </div>
        </nav>

    );
};

export default Navbar;