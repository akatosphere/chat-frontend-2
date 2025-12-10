import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/shared/shadcn/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 cursor-pointer disabled:pointer-events-none disabled:bg-muted disabled:text-muted-foreground whitespace-nowrap text-sm transition-all  [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-white desktop:hover:bg-primary-light desktop:hover:text-primary active:bg-primary-light active:text-primary",
        outline:
          "border border-primary border-[2px] text-primary desktop:hover:border-accent desktop:hover:text-primary-dark active:border-accent active:text-primary-dark disabled:border-muted dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        text: "p-0 bg-transparent text-primary desktop:hover:text-primary-light active:text-primary-light",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        lg: "h-[56px] text-tight font-medium rounded-md px-[150px] py-[26px] has-[>svg]:px-4",
        md: "h-[56px] text-tight font-medium rounded-md px-[150px] py-[26px]",
        sm: "h-[44px] desktop:h-[32px] subtext-tight desktop:text-tight font-normal rounded-md desktop:rounded-sm gap-1 px-[28px] desktop:px-[16px] py-[10px] desktop:py-[6px] desktop:border-none has-[>svg]:px-2.5",
        inline: "h-auto p-0 leading-none",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
