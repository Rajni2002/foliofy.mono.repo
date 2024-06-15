"use client"
import React, { useEffect, useState } from 'react';

import { mergeCN as cn, mergeCN } from '@foliofy/utils';
import { BriefcaseBusinessIcon, Home, Newspaper, Users } from '@foliofy/ui/icons';
import { usePathname } from 'next/navigation';
import { NavItem } from '@/types/navbar';
import ToggleTheme from './toggle-theme';
import Link from 'next/link';

const nav_items: NavItem[] = [
    {
        name: "home",
        path: "/",
        icon: <Home size={20} />
    },
    {
        name: "connect",
        path: "/connect",
        icon: <Users size={20} />
    },
    {
        name: "blogs",
        path: "/blogs",
        icon: <Newspaper size={20} />
    },
    {
        name: "work",
        path: "/work",
        icon: <BriefcaseBusinessIcon size={20} />
    },
    // {
    //     name: "story map",
    //     path: "/story-map",
    //     icon: <Netw
    // },
]

const DEFAULT_NAV_ITEM_CLASS = ""


const Navbar = () => {
    const pathname = usePathname();
    return (
        <nav className='flex w-fit justify-between px-4 py-2 gap-5 items-center bg-white/20 backdrop-blur fixed bottom-5 mx-auto left-0 right-0 z-10 rounded-xl text-gray-400'>
            {nav_items.map(item =>
                <div key={item.path} className={mergeCN('cursor-pointer',
                    item.path === pathname ? "bg-white p-2 rounded-xl text-black" : "")}>
                    <Link href={item.path}>
                        {item.icon}
                    </Link>
                </div>)}
            <ToggleTheme />
        </nav>

    );
};

export default Navbar;