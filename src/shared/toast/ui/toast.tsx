import Image from "next/image"
import { useEffect } from "react"

type ToastProps = {
  message?: string
  duration?: number
  onClose: () => void
  icon: {
    mobile: string
    desktop?: string
  }
}

export const Toast = ({
  message = "Новый код отправлен",
  duration = 3000,
  onClose,
  icon,
}: ToastProps) => {
  useEffect(() => {
    let active = true

    const timer = setTimeout(() => {
      if (active) onClose()
    }, duration)

    return () => {
      active = false
      clearTimeout(timer)
    }
  }, [duration, onClose])

  if (!message) return null

  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className="
        pointer-events-none
        absolute
        md:bottom-0 md:mb-6
        left-0 md:left-1/2 md:-translate-x-1/2
        w-full md:max-w-[360px]
        bg-[rgba(0,0,0,0.6)]
        p-3
        rounded-md
        text-white
        animate-in
        fade-in
        slide-in-from-bottom-2
        duration-200
      "
    >
      <div className="flex items-center">
        <Image
          src={icon.mobile}
          width={16}
          height={16}
          alt=""
          aria-hidden
          className="block md:hidden"
        />
        <Image
          src={icon.desktop ?? icon.mobile}
          width={20}
          height={20}
          alt=""
          aria-hidden
          className="hidden md:block"
        />
        <p className="ml-3">{message}</p>
      </div>
    </div>
  )
}
