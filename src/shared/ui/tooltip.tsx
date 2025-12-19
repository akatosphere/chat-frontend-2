"use client";

import Image from "next/image";
import { useState } from "react";

import { cn } from "../shadcn/lib/utils";
import { Button } from "../shadcn/ui/button";

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
      <Button variant="text" size="icon-sm" onClick={handleToggle} aria-label="Показать подсказку">
        <Image
          src="/icons/info.svg"
          alt="Информация"
          width={24}
          height={24}
          className={cn(
            "cursor-pointer transition-transform duration-100 ease-in-out",
            isOpen && "scale-[0.95]",
          )}
        />
      </Button>

      <div
        className={cn(
          "bg-primary-dark text-caption absolute right-[70px] bottom-11 z-10 max-w-[330px] min-w-[330px] translate-x-1/2 rounded-2xl p-4 lg:p-5",
          "transition-all duration-200 ease-out",
          "origin-bottom transform",
          isOpen ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0",
        )}
      >
        <div className="border-t-primary-dark absolute right-[90px] -bottom-4 h-0 w-0 border-t-30 border-r-18 border-l-18 border-r-transparent border-l-transparent" />

        <div className="caption lg:minitext flex flex-col gap-1 lg:gap-2">{children}</div>
      </div>
      {isOpen && (
        <div className="pointer-events-auto absolute bottom-6 left-1/2 h-6 w-40 -translate-x-1/2" />
      )}
    </div>
  );
};
