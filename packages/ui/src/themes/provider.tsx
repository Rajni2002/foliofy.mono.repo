import React, { ReactNode, createContext, useContext, useState } from "react";
import { ThemeType, RadiusType } from "./theme";
import { mergeCN } from "@foliofy/utils";
interface ThemeContextProps {
    theme: ThemeType;
    radius: RadiusType
}

const ThemeContext = createContext<ThemeContextProps>({
    theme: "default",
    radius: 0.3,
});

const ThemeProvider = ({ children, theme = "default", className, radius = 0.3 }: {
    children: ReactNode,
    theme: ThemeType,
    className: string,
    radius: RadiusType
}) => {

    return (
        <ThemeContext.Provider value={{ theme, radius }}>
            <div
                className={mergeCN(
                    `theme-${theme}`,
                    className
                )}
                style={
                    {
                        "--radius": `${radius}rem`,
                    } as React.CSSProperties
                }>
                {children}
            </div>
        </ThemeContext.Provider>
    );
};

const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

export { ThemeProvider, useTheme };