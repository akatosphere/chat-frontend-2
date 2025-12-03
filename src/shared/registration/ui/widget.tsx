import * as React from "react"
import { cn } from "@/shared/shadcn/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const widgetVariants = cva(
  "rounded-2xl overflow-hidden p-6 flex flex-col items-center border-2 border-white md:border-none",
  {
    variants: {
      variant: {
        start: "bg-[#E9E7FE] md:shadow-[-24px_-24px_80px_rgba(105,92,122,0.15),24px_24px_80px_rgba(105,92,122,0.15)]",
        form: "bg-white md:bg-[#E9E7FE] md:shadow-[-24px_-24px_80px_rgba(105,92,122,0.15),24px_24px_80px_rgba(105,92,122,0.15)]",
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

export interface WidgetProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof widgetVariants> {
  header?: React.ReactNode
  body?: React.ReactNode
  button?: React.ReactNode
}

export function Widget({
  header,
  body,
  button,
  variant,
  size,
  className,
  ...props
}: WidgetProps) {
  return (
    <div className={cn(widgetVariants({ variant, size }), className)} {...props}>
      
      {/* Белые размытые пятна */}
      <div className="absolute z-0 w-48 h-48 top-[50%] left-[60%] rounded-full bg-white/70 blur-[50px] " />
      <div className="absolute z-0 w-48 h-48 top-[70%] left-0 rounded-full bg-white/70 blur-[50px]" />
      <div className="absolute z-0 w-48 h-48 top-[-10%] left-0 rounded-full bg-white/70 blur-[50px]" />

      {/* Контен виджета */}
      {header && <div className="z-10 mt-4">{header}</div>}
      {body && <div className="z-10 mt-6 w-full text-center">{body}</div>}
      {button && (
        <div className="z-10 mt-6 md:mt-auto md:mb-20 flex justify-center">
          {button}
        </div>
      )}
    </div>
  )
}
