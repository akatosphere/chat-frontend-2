// components/ContextMenuContent.tsx
"use client";

import { useEffect, useRef } from "react";

import { cn } from "@/shared/shadcn/lib/utils";

import { MenuItem } from "./contextMenu";

type Props = {
  items: MenuItem[];
  position: { x: number; y: number };
  onClose: () => void;
};

export const ContextMenuContent = ({ items, position, onClose }: Props) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      onClose();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("click", handleClickOutside);
    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  useEffect(() => {
    if (!menuRef.current) return;

    const menu = menuRef.current;
    const rect = menu.getBoundingClientRect();

    let adjustedX = position.x;
    let adjustedY = position.y;

    if (rect.right > window.innerWidth) {
      adjustedX = window.innerWidth - rect.width - 10;
    }
    if (rect.bottom > window.innerHeight) {
      adjustedY = window.innerHeight - rect.height - 10;
    }

    menu.style.left = `${adjustedX}px`;
    menu.style.top = `${adjustedY}px`;
  }, [position]);

  return (
    <div
      ref={menuRef}
      className="fixed z-50 max-w-[250px] min-w-[250px] overflow-hidden rounded-md bg-white shadow-lg"
      style={{ left: position.x, top: position.y }}
    >
      {items.map((item, i) => (
        <button
          key={i}
          onClick={() => {
            item.onClick();
            onClose();
          }}
          className={`space-x-full subtext border-light-gray flex w-full items-center justify-between gap-1.5 border-b px-4 py-2.5 text-left transition-colors last:border-0 hover:bg-gray-100 ${item.destructive ? "text-error" : "text-black"}`}
        >
          <span>{item.label}</span>
          {item.icon && (
            <item.icon
              className={cn(
                "text-gray min-h-6 w-auto object-contain",
                item.destructive && "text-error",
              )}
            />
          )}
        </button>
      ))}
    </div>
  );
};
