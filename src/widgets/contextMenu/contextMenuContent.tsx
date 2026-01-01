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

  // Обработка закрытия
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

  // Корректировка позиции
  useEffect(() => {
    if (!menuRef.current) return;

    setReady(false);
    /// eslint-disable-next-line react-hooks/exhaustive-deps

    const adjust = () => {
      if (!menuRef.current) return;

      const rect = menuRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      // НОВАЯ ЛОГИКА: позиционируем НАД курсором и СЛЕВА от него
      // Начальные координаты: курсор - размеры меню
      let adjustedX = position.x - rect.width; // слева от курсора
      let adjustedY = position.y - rect.height; // над курсором

      // КОРРЕКЦИЯ ЕСЛИ НЕ ВЛЕЗАЕТ:

      // 1. Если меню вылезает за левый край экрана
      if (adjustedX < 10) {
        // Пробуем справа от курсора
        adjustedX = position.x;
        // Если и справа не влезает, прижимаем к левому краю
        if (adjustedX + rect.width > viewportWidth) {
          adjustedX = 10;
        }
      }

      // 2. Если меню вылезает за верхний край экрана
      if (adjustedY < 10) {
        // Пробуем под курсором
        adjustedY = position.y;
        // Если и снизу не влезает, прижимаем к верхнему краю
        if (adjustedY + rect.height > viewportHeight) {
          adjustedY = 10;
        }
      }

      // 3. Если всё ещё вылезает за правый край
      if (adjustedX + rect.width > viewportWidth) {
        adjustedX = Math.max(10, viewportWidth - rect.width - 10);
      }

      // 4. Если всё ещё вылезает за нижний край
      if (adjustedY + rect.height > viewportHeight) {
        adjustedY = Math.max(10, viewportHeight - rect.height - 10);
      }

      setCoords({ x: adjustedX, y: adjustedY });
      setReady(true);
    };

    // Даем React отрендерить меню с нулевой прозрачностью, потом корректируем
    requestAnimationFrame(() => {
      requestAnimationFrame(adjust);
    });
  }, [items, position]);

  return (
    <div
      ref={menuRef}
      className={cn(
        "fixed z-50 max-w-[250px] min-w-[250px] overflow-hidden rounded-md bg-white shadow-lg transition-opacity",
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
          className={`space-x-full subtext border-light-gray flex w-full items-center justify-between gap-1.5 border-b px-4 py-2.5 text-left transition-colors last:border-0 hover:bg-gray-100 ${
            item.destructive ? "text-error" : "text-black"
          }`}
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
