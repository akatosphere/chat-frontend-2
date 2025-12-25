import { cva, VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/shared/shadcn/lib/utils";

const textareaVariants = cva(
  "focus-visible:border-primary scrollbar block w-full resize-none rounded-md bg-white text-black transition outline-none disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border-gray placeholder-gray border",
        error: "border-error focus-visible:border-error placeholder-gray border-2",
        underline: "rounded-none border-0 border-b",
      },
      textareaSize: {
        md: "desktop:h-[219] text h-[280px] rounded-md py-[16px] pr-[10px] pl-[20px] font-normal",
      },
    },
    defaultVariants: {
      variant: "default",
      textareaSize: "md",
    },
  },
);

type HTMLTextareaProps = Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "size">;

export interface TextareaProps extends HTMLTextareaProps, VariantProps<typeof textareaVariants> {}

// export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
//   ({ className, variant, textareaSize, disabled, ...props }, ref) => (
//     <textarea
//       disabled={disabled}
//       ref={ref}
//       className={cn(TextareaVariants({ variant, textareaSize }), className)}
//       {...props}
//     />
//   )
// );

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  // eslint-disable-next-line @typescript-eslint/naming-convention
  function Textarea({ className, variant, textareaSize, disabled, ...props }, ref) {
    return (
      <textarea
        disabled={disabled}
        ref={ref}
        className={cn(textareaVariants({ variant, textareaSize }), className)}
        {...props}
      />
    );
  },
);

Textarea.displayName = "Textarea";
