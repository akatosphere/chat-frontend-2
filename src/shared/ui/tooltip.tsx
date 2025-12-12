"use client";

import Image from "next/image";
import { cn } from "../shadcn/lib/utils";
import { Button } from "../shadcn/ui/button";
import { useState } from "react";

interface Props {
  className?: string;
  children?: React.ReactNode;
}

export const Tooltip: React.FC<Props> = ({ className, children }) => {
  const [isOpen, setOpen] = useState(false);

  const handleToggle = () => setOpen((prev) => !prev);

  return (
    <div
      className={cn("relative flex items-center", className)}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Button
        variant="text"
        size="icon-xs"
        onClick={handleToggle}
        aria-label="Показать подсказку"
      >
        <Image
          src="/icons/info.svg"
          alt="Информация"
          width={24}
          height={24}
          className={cn(
            "cursor-pointer transition-transform duration-100 ease-in-out",
            isOpen && "scale-[0.95]"
          )}
        />
      </Button>

      <div
        className={cn(
          "absolute bottom-11 min-w-[330px] max-w-[330px] right-[70px] translate-x-1/2 p-4 lg:p-5 bg-primary-dark text-caption rounded-2xl z-10",
          "transition-all duration-200 ease-out",
          "transform origin-bottom",
          isOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-2 pointer-events-none"
        )}
      >
        <div className="absolute -bottom-4 right-[90px] w-0 h-0 border-l-18 border-r-18 border-t-30 border-l-transparent border-r-transparent border-t-primary-dark" />

        <div className="flex flex-col gap-1 lg:gap-2 caption lg:minitext">
          {children}
        </div>
      </div>
      {isOpen && (
        <div className="absolute bottom-6 left-1/2 w-40 h-6 -translate-x-1/2 pointer-events-auto" />
      )}
    </div>
  );
};
