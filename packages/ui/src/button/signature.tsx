import * as React from "react"
import { mergeCN } from "@foliofy/utils"
import { cva, type VariantProps } from "class-variance-authority"
import { ButtonProps } from "./types"

export const signatureButtonVariants = cva(
    "bg-gradient-to-l from-orange-500 from-[5%] to-[#7834FF] text-white cursor-pointer font-bold border-[1px] sm:py-2 py-1 sm:px-5 px-4 rounded-3xl sm:rounded-4xl border-gray-700 w-fit transition duration-500",
    {
        variants: {
            mode: {
                dark: "bg-black hover:shadow-[0px_0px_40px_10px_#888888]",
                light: "bg-gray-200 hover:shadow-[0px_0px_40px_10px_#7834FF]"
            }
        },
        defaultVariants: {
            mode: "dark"
        }
    },
)

interface SignatureButtonProps extends ButtonProps,
    VariantProps<typeof signatureButtonVariants> { }

export const SignatureButton = React.forwardRef<HTMLButtonElement, SignatureButtonProps>(
    ({ mode = "dark", children = "Be the first one", className = "", ...props }, ref) => {
        return (
            <button
                className={mergeCN(signatureButtonVariants({ mode, className }))}
                {...props}
                ref={ref}
            >
                <span>
                    {children}
                </span>
                <span className='ml-2'>
                    🚀
                </span>
            </button>
        );
    }
)
SignatureButton.displayName = "SignatureButton"
