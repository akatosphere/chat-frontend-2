import { cva, type VariantProps } from "class-variance-authority";
import Image from "next/image";

import { cn } from "@/shared/shadcn/lib/utils";

const backgroundVariants = cva("w-full h-[100svh] flex justify-center items-center relative", {
  variants: {
    variant: {
      default: "bg-gradient-mobile md:bg-white",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

type BackgroundProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof backgroundVariants>;

export const Background = ({ variant, className, children, ...props }: BackgroundProps) => {
  return (
    <div className={cn(backgroundVariants({ variant }), className)} {...props}>
      {/* Desktop фон фото */}
      <div className="absolute inset-0 z-0 hidden md:block">
        <Image
          src="/bgStartPageDef.png"
          alt="desktop background"
          fill
          style={{ objectFit: "cover" }}
        />
      </div>

      {/* Передний план */}
      <div className="fullscreen relative z-10 flex w-full items-center justify-center">
        {children}
      </div>
    </div>
  );
};
