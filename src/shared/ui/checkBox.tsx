"use client";
import * as React from "react";

import { cn } from "@/shared/shadcn/lib/utils";
import CheckBoxIcon from "@/shared/ui/icons/checkBox.svg";

export interface CheckboxProps {
  checked: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
  disabled?: boolean;
}

export const Checkbox = React.forwardRef<HTMLElement, CheckboxProps>(
  ({ checked, onChange, className, disabled = false }, ref) => {
    // Общие стили для обоих состояний
    const styles = cn(
      "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-all",
      "bg-transparent",
      !checked ? "border-primary" : "border-transparent",
      disabled && "cursor-not-allowed opacity-50",
      className,
    );

    const content = checked ? <CheckBoxIcon className="h-5 w-5" /> : null;

    // Режим 1: Интерактивный (Самостоятельная кнопка)
    if (onChange) {
      return (
        <button
          ref={ref as React.Ref<HTMLButtonElement>}
          type="button"
          role="checkbox"
          aria-checked={checked}
          disabled={disabled}
          onClick={(e) => {
            e.stopPropagation(); // Важно, если кнопка всё же окажется внутри кликабельного контейнера
            onChange(!checked);
          }}
          className={styles}
        >
          {content}
        </button>
      );
    }

    // Режим 2: Презентационный (Просто визуальный индикатор)
    return (
      <div
        ref={ref as React.Ref<HTMLDivElement>}
        className={styles}
        aria-hidden="true" // Скрываем от скринридеров, так как состояние опишет родитель-кнопка
      >
        {content}
      </div>
    );
  },
);

Checkbox.displayName = "Checkbox";
