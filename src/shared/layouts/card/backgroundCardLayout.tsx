import * as React from "react";
import { cn } from "@/shared/shadcn/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const backgroundCardLayoutVariants = cva(
  "rounded-lg rounded-md overflow-hidden p-4 pt-11 desktop:p-16 desktop:pt-18 desktop:pb-20 flex flex-col items-center border-2 border-white desktop:border-none",
  {
    variants: {
      variant: {
        start:
          "bg-[#E9E7FE] desktop:shadow-[-24px_-24px_80px_rgba(105,92,122,0.15),24px_24px_80px_rgba(105,92,122,0.15)]",
        form: "bg-white desktop:bg-[#E9E7FE] desktop:shadow-[-24px_-24px_80px_rgba(105,92,122,0.15),24px_24px_80px_rgba(105,92,122,0.15)]",
      },
      size: {
        default: "max-w-lg w-full h-[95%] max-h-[760px] m-3",
      },
    },
    defaultVariants: {
      variant: "start",
      size: "default",
    },
  }
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
      className={cn(
        backgroundCardLayoutVariants({ variant, size }),
        "relative",
        className
      )}
      {...props}
    >
      {children ? (
        <div className="relative z-10 w-full h-full flex flex-col">
          {children}
        </div>
      ) : (
        <div className="flex justify-center items-center z-10 text-red-500">
          Контента нет
        </div>
      )}

      {/* Белые размытые пятна */}
      <div className="absolute z-0 w-48 h-48 top-[50%] left-[60%] rounded-full bg-white/70 blur-[50px] " />
      <div className="absolute z-0 w-48 h-48 top-[70%] left-0 rounded-full bg-white/70 blur-[50px]" />
      <div className="absolute z-0 w-48 h-48 top-[-10%] left-0 rounded-full bg-white/70 blur-[50px]" />
    </div>
  );
};
