import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/shared/shadcn/lib/utils";

const buttonVariants = cva(
  "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 disabled:bg-muted disabled:text-muted-foreground aria-invalid:border-destructive inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 text-sm whitespace-nowrap transition-all outline-none disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary hover:bg-primary-light hover:text-primary text-white",
        destructive:
          "bg-destructive hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60 text-white",
        outline:
          "text-primary dark:bg-input/30 dark:bg-input/30 hover:border-accent hover:text-primary-dark dark:border-input dark:hover:bg-input/50 border-primary disabled:border-muted border border-[2px]",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
        text: "text-primary hover:hover:text-primary-light bg-transparent p-0",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        lg: "desktop:w-[360] text-tight h-[56px] w-[329px] rounded-md px-[150px] py-[26px] font-medium has-[>svg]:px-4",
        md: "text-tight h-[56px] w-[297px] rounded-md px-[150px] py-[26px] font-medium",
        sm: "desktop:w-[89px] desktop:h-[32] subtext-tight desktop:text-tight desktop:rounded-sm desktop:px-[16px] desktop:p-[6px] desktop:border-none h-[44px] w-[140.5px] gap-[4px] rounded-md px-[28px] py-[10px] font-normal has-[>svg]:px-2.5",
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
  },
);

const Button = ({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) => {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
};

export { Button, buttonVariants };
