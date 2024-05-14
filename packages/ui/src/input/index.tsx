import * as React from "react"
import { mergeCN } from "@foliofy/utils"

interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> { }

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> { }

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, required, ...props }, ref) => {
    return (
      <input
        type={type}
        className={mergeCN(
          "flex h-10 text-gray-400 w-10/12 rounded-[.5rem] md:rounded-xl border my-5 mx-auto border-gray-500 focus:border-gray-300 bg-background px-2 md:px-3 md:py-2 text-xs md:text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"


export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={mergeCN(
          "flex min-h-[80px] text-gray-400 w-10/12 mx-auto rounded-[.5rem] md:rounded-xl border bg-black border-gray-500 focus:border-gray-300 px-2 py-1 md:px-3 md:py-2 text-xs md:text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"