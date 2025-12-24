import { cva, type VariantProps } from "class-variance-authority";
import Image from "next/image";

import { cn } from "@/shared/shadcn/lib/utils";

const backgroundVariants = cva("relative flex h-[100svh] w-full items-center justify-center", {
  variants: {
    variant: {
      default: "bg-gradient-mobile desktop:bg-white",
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
      <div className="desktop:block absolute inset-0 z-0 hidden">
        <Image
          src="/auth/bgStartPageDef.png"
          alt="desktop background"
          priority
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
