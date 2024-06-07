import { mergeCN as cn } from "@foliofy/utils";
import React, { ReactNode } from "react";

type TypographyType = {
    children: ReactNode
    className?: string
}

export function H1({ children, className }: TypographyType) {
    return (
        <h1 className={cn("scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl", className)}>
            {children}
        </h1>
    )
}

export function H2({ children, className }: TypographyType) {
    return (
        <h2 className={cn("scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0", className)}>
            {children}
        </h2>
    )
}
