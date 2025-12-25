import React, { KeyboardEvent } from "react";

import { cn } from "@/shared/shadcn/lib/utils";

interface Props {
  className?: string;
  disabled?: boolean;
  error?: boolean;
  value?: string;
  index: number;
  inputRef: (el: HTMLInputElement | null) => void;
  onChange: (index: number, value: string) => void;
  onKeyDown: (index: number, e: KeyboardEvent<HTMLInputElement>) => void;
  onPasteFull: (text: string) => void;
}

export const VerificationCodeInputCell: React.FC<Props> = ({
  className,
  inputRef,
  disabled,
  error,
  value,
  index,
  onChange,
  onKeyDown,
  onPasteFull,
}) => {
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedText = e.clipboardData.getData("Text");
    onPasteFull(pastedText);
  };

  return (
    <input
      ref={inputRef}
      value={value}
      id={`code-${index}`}
      aria-label={`Цифра ${index + 1}`}
      disabled={disabled || error}
      inputMode="numeric"
      className={cn(
        "border-primary text flex h-[60px] w-[60px] items-center justify-center rounded-sm border text-center transition-colors duration-200",
        "focus:border-2 focus:outline-none",
        error && "border-error border-2",
        disabled && "border-muted cursor-not-allowed",
        className,
      )}
      maxLength={1}
      onChange={(e) => onChange(index, e.target.value)}
      onKeyDown={(e) => onKeyDown(index, e)}
      onPaste={handlePaste}
    />
  );
};
