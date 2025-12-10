import Image from "next/image";
import { cn } from "@/shared/shadcn/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const backgroundVariants = cva(
  "w-full h-[100svh] flex justify-center items-center relative",
  {
    variants: {
      variant: {
        default: "bg-gradient-mobile desktop:bg-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

type BackgroundProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof backgroundVariants>;

export const Background = ({
  variant,
  className,
  children,
  ...props
}: BackgroundProps) => {
  return (
    <div className={cn(backgroundVariants({ variant }), className)} {...props}>
      {/* Desktop фон фото */}
      <div className="hidden desktop:block absolute inset-0 z-0">
        <Image
          src="/auth/bgStartPageDef.png"
          alt="desktop background"
          priority
          fill
          style={{ objectFit: "cover" }}
        />
      </div>

      {/* Передний план */}
      <div className="relative z-10 w-full fullscreen flex justify-center items-center">
        {children}
      </div>
    </div>
  );
};
