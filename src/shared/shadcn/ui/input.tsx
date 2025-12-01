import * as React from "react"
import { cva, VariantProps } from "class-variance-authority"
import { cn } from "@/shared/shadcn/lib/utils"

const inputVariants = cva(
  "block w-full rounded-md text-black transition outline-none focus-visible:border-primary disabled:opacity-50 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        default: "border border-gray placeholder-gray",
        error: "border-2 border-red focus-visible:border-red placeholder-gray",
        underline: "border-0 border-b rounded-none",
      },
      inputSize: {
        md: "w-[329px] desktop:w-[360] h-[56px] text font-medium rounded-md py-[16px] pr-[10px] pl-[20px]",
      },
    },
    defaultVariants: {
      variant: "default",
      inputSize: "md",
    },
  }
)

type HTMLInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size"
>

export interface InputProps
  extends HTMLInputProps,
    VariantProps<typeof inputVariants> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, inputSize, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(inputVariants({ variant, inputSize }), className)}
      {...props}
    />
  )
)

Input.displayName = "Input"
