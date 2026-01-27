"use client";
import * as React from "react";

import { cn } from "@/shared/shadcn/lib/utils";
import CheckBox from "@/shared/ui/icons/checkBox.svg";
export interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
  disabled?: boolean;
}
export const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>(
  ({ checked, onChange, className, disabled = false }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        role="checkbox"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={cn(
          "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-all",
          "bg-transparent disabled:cursor-not-allowed disabled:opacity-50",
          !checked ? "border-primary" : "border-none",
          className,
        )}
      >
        {checked && <CheckBox className="h-5 w-5" />}
      </button>
    );
  },
);
Checkbox.displayName = "Checkbox";
