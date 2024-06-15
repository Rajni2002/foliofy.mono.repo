"use client"
import { MoonStarIcon, Sun } from "@foliofy/ui/icons";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ToggleTheme = () => {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false); // to safely show the UI for the 

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    return (
        <div className="cursor-pointer hover:opacity-75 border-l pl-3 border-gray-400 text-white" onClick={
            () => setTheme((theme === "dark" ? "light" : "dark"))
        }>
            {
                theme && (theme === "dark") ?
                    <MoonStarIcon size={20} />
                    :
                    <Sun size={20} />
            }
        </div>
    );
};

export default ToggleTheme;


/**
 * <div className="self-center hover:cursor-pointer hover:opacity-75 mx-3" onClick={
                    () => setTheme((theme === "dark" ? "light" : "dark"))
                }>
                    {
                        theme && (theme === "dark") ?
                            <MoonStarIcon color='white' />
                            :
                            <Sun color='black' />
                    }
                </div>
 */


