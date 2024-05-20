import { mergeCN } from "@foliofy/utils"
import React, { ReactNode } from 'react';

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
    children: ReactNode
}

export const GradientText = React.forwardRef<HTMLHeadingElement, HeadingProps>(
    ({ children, className, ...props }, ref) => (
        <span className={mergeCN("bg-gradient-to-l from-orange-500 from-[5%] to-[#7834FF] bg-clip-text text-transparent", className)} ref={ref} {...props}>
            {children}
        </span>
    )
)
GradientText.displayName = "GradientText"