import Image from "next/image";
import { useEffect, useState } from "react";

type toastProps = {
  message?: string
  duration?: number
  onClose: () => void
  icon: {
    mobile: string,
    desktop?: string,
  }
}

export const Toast = ({
    message = "Новый код отправлен", 
    duration = 3000, 
    onClose,
    icon,
  }: toastProps) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose();
    }, duration)
    
    return () => clearTimeout(timer);

  }, [duration, onClose])

  if(!visible) return null

  return (
    <div className="absolute md:bottom-0 md:mb-6 left-0 md:left-1/2 md:transform md:-translate-x-1/2 w-full md:max-w-[360px] bg-[rgba(0,0,0,0.6)] p-3 rounded-md text-white">
      <div className="flex items-center">
        <Image src={icon.mobile} width={16} height={16} alt="icon" className="block md:hidden" />
        <Image src={icon.desktop ?? icon.mobile} width={20} height={20} alt="icon" className="hidden md:block"/>
        <p className="ml-3" role="status" aria-live="polite">{message}</p>
      </div>
    </div>
  )
}
