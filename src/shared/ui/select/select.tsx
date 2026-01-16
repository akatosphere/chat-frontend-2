"use client";

import ArrowDown from "@icons/arrowDown.svg";
import OkIcon from "@icons/ok.svg";
import { KeyboardEvent, useEffect, useRef, useState } from "react";

import { cn } from "@/shared/shadcn/lib/utils";

type SelectValue = string | number;

type Option = {
  value: SelectValue;
  label: string;
};

type SelectProps = {
  options: readonly Option[];
  value: SelectValue | null | undefined;
  onChange: (value: SelectValue) => void;
  placeholder?: string;
  className?: string;
};

export const Select = ({
  options,
  value,
  onChange,
  placeholder = "Выберите…",
  className,
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const rootRef = useRef<HTMLDivElement>(null);
  const selectedOption = options.find((o) => o.value === value);

  useEffect(() => {
    const handler = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("pointerdown", handler);
    return () => document.removeEventListener("pointerdown", handler);
  }, []);

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (!isOpen && (e.key === "Enter" || e.key === "ArrowDown")) {
      e.preventDefault();
      setIsOpen(true);
      setActiveIndex(0);
      return;
    }

    if (!isOpen) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, options.length - 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
        break;
      case "Enter":
        e.preventDefault();
        if (options[activeIndex]) {
          onChange(options[activeIndex].value);
          setIsOpen(false);
        }
        break;
      case "Escape":
        setIsOpen(false);
        break;
    }
  };

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        onKeyDown={onKeyDown}
        className={`text border-gray flex h-14 w-full items-center justify-between bg-white px-2.5 focus:outline-none ${
          isOpen
            ? "border-primary rounded-t-md rounded-b-none border"
            : "desktop:border-transparent rounded-md border"
        } `}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="truncate text-black">{selectedOption?.label ?? placeholder}</span>
        <ArrowDown className={cn("h-3 w-3 transition-transform", isOpen ? "rotate-180" : "")} />
      </button>

      {isOpen && (
        <ul
          role="listbox"
          className="scroll-xs border-primary absolute top-full right-0 left-0 max-h-[140px] overflow-auto rounded-b-md border-x border-b bg-white"
        >
          {options.map((option, index) => {
            const isSelected = option.value === value;
            const isActive = index === activeIndex;

            return (
              <li
                key={option.value}
                role="option"
                aria-selected={isSelected}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`text relative flex cursor-pointer items-center px-2.5 ${isActive ? "bg-violet-50" : ""} `}
              >
                <span className="truncate text-black">{option.label}</span>

                {isSelected && <OkIcon className="text absolute right-0 w-4.5" />}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
