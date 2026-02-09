"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/shared/shadcn/lib/utils";

import { ContextMenu } from "./contextMenu";
import { MenuItem } from "./contextMenuProvider";

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
    if (!menuRef.current) return;

    const adjust = () => {
      if (!menuRef.current) return;

      setReady(false);

      const rect = menuRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      let adjustedX = position.x - rect.width;
      let adjustedY = position.y - rect.height;

      if (adjustedX < 10) adjustedX = Math.min(position.x, viewportWidth - rect.width - 10);
      if (adjustedY < 10) adjustedY = Math.min(position.y, viewportHeight - rect.height - 10);
      if (adjustedX + rect.width > viewportWidth)
        adjustedX = Math.max(10, viewportWidth - rect.width - 10);
      if (adjustedY + rect.height > viewportHeight)
        adjustedY = Math.max(10, viewportHeight - rect.height - 10);

      setCoords({ x: adjustedX, y: adjustedY });
      setReady(true);
    };

    requestAnimationFrame(() => requestAnimationFrame(adjust));
  }, [items, position]);

  // 🟢 Listener'ы
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!menuRef.current) return;

      if (!menuRef.current.contains(e.target as Node)) {
        if (e.button === 0) {
          // Левый клик — блокируем подложку
          e.preventDefault();
          e.stopPropagation();
        }
        onClose();
      }
    };

    const handleContextMenu = (e: MouseEvent) => {
      if (menuRef.current && menuRef.current.contains(e.target as Node)) {
        // Правый клик внутри меню — блокируем стандартное меню
        e.preventDefault();
      } else {
        // Правый клик вне меню — закрываем текущее, но новое меню покажется
        onClose();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    const handleResize = () => onClose();

    document.addEventListener("mousedown", handleClickOutside, true);
    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside, true);
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
    };
  }, [onClose]);

  return (
    <>
      <div
        className="fixed inset-0 z-40"
        onMouseDown={(e) => {
          if (e.button === 0) {
            e.preventDefault();
            e.stopPropagation();
          }
          onClose();
        }}
        // 🔴 Только это добавляем для тача
        onTouchStart={(e) => {
          e.preventDefault();
          onClose();
        }}
      />

      {/* меню */}
      <div
        ref={menuRef}
        className={cn(
          "fixed z-50 max-w-[250px] min-w-[250px] overflow-hidden rounded-md bg-white shadow-[0_2px_12px_0_rgba(0,0,0,0.2)] transition-opacity",
          !ready && "pointer-events-none opacity-0",
        )}
        style={{ left: coords.x, top: coords.y }}
        onContextMenu={(e) => e.preventDefault()}
        // 🔴 И это для тача внутри меню
        onTouchStart={(e) => e.stopPropagation()}
      >
        <ContextMenu items={items} onClose={onClose} />
      </div>
    </>
  );
};
