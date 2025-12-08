import * as React from "react";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/shared/shadcn/lib/utils";

const TextareaVariants = cva(
  "resize-none block w-full rounded-md text-black transition outline-none focus-visible:border-primary disabled:opacity-50 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        default: "border border-gray placeholder-gray",
        error:
          "border-2 border-error focus-visible:border-error placeholder-gray",
        underline: "border-0 border-b rounded-none",
      },
      textareaSize: {
        md: "h-[280px] desktop:h-[219] text font-medium rounded-md py-[16px] pr-[10px] pl-[20px]",
      },
    },
    defaultVariants: {
      variant: "default",
      textareaSize: "md",
    },
  }
);

type HTMLTextareaProps = Omit<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  "size"
>;

export interface TextareaProps
  extends HTMLTextareaProps,
    VariantProps<typeof TextareaVariants> {}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant, textareaSize, disabled, ...props }, ref) => (
    <textarea
      disabled={disabled}
      ref={ref}
      className={cn(TextareaVariants({ variant, textareaSize }), className)}
      {...props}
    />
  )
);

Textarea.displayName = "Textarea";
