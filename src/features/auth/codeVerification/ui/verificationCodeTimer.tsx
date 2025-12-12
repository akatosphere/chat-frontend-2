"use client";
import React from "react";
import { formatTime } from "@/shared/lib/format-time";
import { cn } from "@/shared/shadcn/lib/utils";

interface TimerDisplayProps {
  className?: string;
  seconds: number;
}

export const VerificationCodeInputTimer: React.FC<TimerDisplayProps> = ({
  className,
  seconds,
}) => {
  return (
    <span
      className={cn(
        "text text-gray font-semibold lg:pt-3 lg:pb-3 w-full block text-center",
        className
      )}
    >
      Отправить новый код через {formatTime(seconds)}
    </span>
  );
};
