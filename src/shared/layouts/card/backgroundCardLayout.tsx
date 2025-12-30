import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/shared/shadcn/lib/utils";

const backgroundCardLayoutVariants = cva(
  // "desktop:p-16 desktop:pt-18 desktop:pb-20 desktop:border-none flex flex-col items-center overflow-hidden rounded-lg rounded-md border-2 border-white p-4 pt-11",
  "desktop:border-none relative flex flex-col items-center overflow-hidden rounded-lg rounded-md",
  {
    variants: {
      variant: {
        start:
          "desktop:shadow-[-24px_-24px_80px_rgba(105,92,122,0.15),24px_24px_80px_rgba(105,92,122,0.15)] bg-[#E9E7FE]",
        form: "desktop:bg-[#E9E7FE] desktop:shadow-[-24px_-24px_80px_rgba(105,92,122,0.15),24px_24px_80px_rgba(105,92,122,0.15)] bg-white",
      },
      size: {
        default: "m-3 h-[95%] max-h-[760px] w-full max-w-lg",
      },
    },
    defaultVariants: {
      variant: "start",
      size: "default",
    },
  },
);

type BackgroundCardLayoutProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof backgroundCardLayoutVariants> & {
    children: React.ReactNode;
  };

export const BackgroundCardLayout = ({
  children,
  variant,
  size,
  className,
  ...props
}: BackgroundCardLayoutProps) => {
  return (
    <div
      className={cn(backgroundCardLayoutVariants({ variant, size }), "relative", className)}
      {...props}
    >
      {children ? (
        <div className="relative z-10 flex h-full w-full flex-col">{children}</div>
      ) : (
        <div className="z-10 flex items-center justify-center text-red-500">Контента нет</div>
      )}

      <div className="absolute top-[50%] left-[60%] z-0 h-48 w-48 rounded-full bg-white/70 blur-[50px]" />
      <div className="absolute top-[70%] left-0 z-0 h-48 w-48 rounded-full bg-white/70 blur-[50px]" />
      <div className="absolute top-[-10%] left-0 z-0 h-48 w-48 rounded-full bg-white/70 blur-[50px]" />
    </div>
  );
};
