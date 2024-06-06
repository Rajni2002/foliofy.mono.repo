import { ReactNode } from "react";

export type ThemeType =
    "default" | "red" | "rose" | "orange" | "green"
    | "blue" | "yellow" | "violet";

export type RadiusType = 0 | 0.3 | 0.5 | 0.75 | 1.0;

export interface ThemeContextProps {
    theme: ThemeType;
    radius: RadiusType
}

export type ThemeProviderProps = {
    children: ReactNode,
    theme?: ThemeType,
    radius?: RadiusType
}