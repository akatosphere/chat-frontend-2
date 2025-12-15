import * as React from "react"
import { cn } from "@/shared/shadcn/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const backgroundCardLayoutVariants = cva(
  "rounded-[8px] md:rounded-[16px] overflow-hidden  flex flex-col items-center border-2 border-white md:border-none",
  {
    variants: {
      variant: {
        start: "bg-[#E9E7FE] md:shadow-[-24px_-24px_80px_rgba(105,92,122,0.15),24px_24px_80px_rgba(105,92,122,0.15)]",
        form: "bg-white md:bg-[#E9E7FE] border-none md:shadow-[-24px_-24px_80px_rgba(105,92,122,0.15),24px_24px_80px_rgba(105,92,122,0.15)]",
      },
      size: {
        default: "max-w-lg w-full h-[95%] m-3",
      },
    },
    defaultVariants: {
      variant: "start",
      size: "default",
    },
  }
)

type BackgroundCardLayoutProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof backgroundCardLayoutVariants> & {
    children: React.ReactNode
  }

export const BackgroundCardLayout = ({
  children,
  variant,
  size,
  ...props
}: BackgroundCardLayoutProps) => {
  return (
    <div className={cn(backgroundCardLayoutVariants({ variant, size }), 'relative')} {...props}>

    {
      children ? (
        <div className="relative z-10 w-full h-full flex flex-col text-red-500">
          {children}
        </div>
      ) : (
        <div className="flex justify-center items-center z-10 text-red-500">Контента нет</div>
      )
    }

      {/* Белые размытые пятна */}
      <div className="absolute z-0 w-48 h-48 top-[50%] left-[60%] rounded-full bg-white/70 blur-[50px] " />
      <div className="absolute z-0 w-48 h-48 top-[70%] left-0 rounded-full bg-white/70 blur-[50px]" />
      <div className="absolute z-0 w-48 h-48 top-[-10%] left-0 rounded-full bg-white/70 blur-[50px]" />
    </div>
  )
}
