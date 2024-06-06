import React, { createContext, useContext } from "react";
import { ThemeContextProps, ThemeProviderProps } from "./theme";

const ThemeContext = createContext<ThemeContextProps>({
    theme: "default",
    radius: 0.3,
});

const ThemeTypeProvider = ({ children, theme = "default", radius = 0.3 }: ThemeProviderProps) => {
    
    React.useEffect(() => {
        document.body.classList.forEach((className) => {
            if (className.match(/^theme.*/)) {
                document.body.classList.remove(className)
            }
        })

        if (theme) {
            // Set the CSS variable --radius
            document.body.style.setProperty("--radius", `${radius}rem`);
            // Add the new theme class to the body
            return document.body.classList.add(`theme-${theme}`)
        } else {
            // Remove the CSS variable --radius if no theme is set
            document.body.style.removeProperty("--radius");
        }
    }, [radius, theme])

    return (
        <ThemeContext.Provider value={{ theme, radius }}>
            {children}
        </ThemeContext.Provider>
    );
};

const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeTypeProvider');
    }
    return context;
};

export { ThemeTypeProvider, useTheme };