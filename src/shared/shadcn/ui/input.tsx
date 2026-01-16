import { cva, VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/shared/shadcn/lib/utils";

const inputVariants = cva(
  "focus-visible:border-primary block w-full rounded-md bg-white text-black transition outline-none disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border-gray placeholder-gray border",
        error: "border-error focus-visible:border-error placeholder-gray border-2",
        underline: "rounded-none border-0 border-b",
      },
      inputSize: {
        md: "text h-[56px] rounded-md py-[16px] pr-[10px] pl-[20px] font-medium",
      },
    },
    defaultVariants: {
      variant: "default",
      inputSize: "md",
    },
  },
);

type HTMLInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">;

export interface InputProps extends HTMLInputProps, VariantProps<typeof inputVariants> {}

// export const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input
//   ({ className, variant, inputSize, disabled, ...props }, ref) (
//     <input disabled={disabled} ref={ref} className={cn(inputVariants({ variant, inputSize }), className)} {...props} />
//   ),
// )

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, variant, inputSize, disabled, ...props },
  ref,
) {
  return (
    <input
      disabled={disabled}
      ref={ref}
      className={cn(inputVariants({ variant, inputSize }), className)}
      {...props}
    />
  );
});

Input.displayName = "Input";
