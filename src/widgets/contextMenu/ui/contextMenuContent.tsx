"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/shared/shadcn/lib/utils";

import { MenuItem } from "./contextMenu";

type Props = {
  items: MenuItem[];
  position: { x: number; y: number };
  onClose: () => void;
};

export const ContextMenuContent = ({ items, position, onClose }: Props) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) onClose();
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

    setReady(false);
    /// eslint-disable-next-line react-hooks/exhaustive-deps

    const adjust = () => {
      if (!menuRef.current) return;

      const rect = menuRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      let adjustedX = position.x - rect.width;
      let adjustedY = position.y - rect.height;

      if (adjustedX < 10) {
        adjustedX = position.x;
        if (adjustedX + rect.width > viewportWidth) {
          adjustedX = 10;
        }
      }

      if (adjustedY < 10) {
        adjustedY = position.y;
        if (adjustedY + rect.height > viewportHeight) {
          adjustedY = 10;
        }
      }

      if (adjustedX + rect.width > viewportWidth) {
        adjustedX = Math.max(10, viewportWidth - rect.width - 10);
      }

      if (adjustedY + rect.height > viewportHeight) {
        adjustedY = Math.max(10, viewportHeight - rect.height - 10);
      }

      setCoords({ x: adjustedX, y: adjustedY });
      setReady(true);
    };

    requestAnimationFrame(() => {
      requestAnimationFrame(adjust);
    });
  }, [items, position]);

  return (
    <div
      ref={menuRef}
      className={cn(
        "fixed z-50 max-w-[250px] min-w-[250px] overflow-hidden rounded-md bg-white shadow-[0_2px_12px_0_rgba(0,0,0,0.2)] transition-opacity",
        !ready && "pointer-events-none opacity-0",
      )}
      style={{ left: coords.x, top: coords.y }}
    >
      {items.map((item, i) => (
        <button
          key={i}
          onClick={() => {
            item.onClick();
            onClose();
          }}
          className={`space-x-full subtext border-light-gray flex w-full cursor-pointer items-center justify-between gap-1.5 border-b px-4 py-2.5 text-left transition-colors last:border-0 hover:bg-gray-100 ${
            item.destructive ? "text-error" : "text-black"
          }`}
        >
          <span>{item.label}</span>
          {item.icon && (
            <item.icon
              className={cn(
                "text-gray h-min max-h-5 min-h-5 w-min max-w-5 min-w-5",
                item.destructive && "text-error",
              )}
            />
          )}
        </button>
      ))}
    </div>
  );
};
