"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/shared/shadcn/lib/utils";

import { ContextMenu } from "./contextMenu";
import { MenuItem, Placement } from "./contextMenuProvider";

type Props = {
  items: MenuItem[];
  position: { x: number; y: number };
  placement: Placement;
  onClose: () => void;
};

export const ContextMenuContent = ({ items, position, placement, onClose }: Props) => {
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

      let adjustedX = position.x;
      let adjustedY = position.y;

      switch (placement) {
        case "top-left":
          adjustedX = position.x - rect.width;
          adjustedY = position.y - rect.height;
          break;
        case "top-right":
          adjustedX = position.x;
          adjustedY = position.y - rect.height;
          break;
        case "bottom-left":
          adjustedX = position.x - rect.width;
          adjustedY = position.y;
          break;
        case "bottom-right":
          adjustedX = position.x;
          adjustedY = position.y;
          break;
      }

      if (adjustedX < 10) adjustedX = 10;
      if (adjustedY < 10) adjustedY = 10;

      if (adjustedX + rect.width > viewportWidth - 10) adjustedX = viewportWidth - rect.width - 10;
      if (adjustedY + rect.height > viewportHeight - 10)
        adjustedY = viewportHeight - rect.height - 10;

      setCoords({ x: adjustedX, y: adjustedY });
      setReady(true);
    };

    requestAnimationFrame(() => requestAnimationFrame(adjust));
  }, [items, position, placement]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!menuRef.current) return;

      if (!menuRef.current.contains(e.target as Node)) {
        if (e.button === 0) {
          e.preventDefault();
          e.stopPropagation();
        }
        onClose();
      }
    };

    const handleContextMenu = (e: MouseEvent) => {
      if (menuRef.current && menuRef.current.contains(e.target as Node)) {
        e.preventDefault();
      } else {
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
      />

      <div
        ref={menuRef}
        className={cn(
          "fixed z-50 max-w-[250px] min-w-[250px] overflow-hidden rounded-md bg-white shadow-[0_2px_12px_0_rgba(0,0,0,0.2)] transition-opacity",
          !ready && "pointer-events-none opacity-0",
        )}
        style={{ left: coords.x, top: coords.y }}
        onContextMenu={(e) => e.preventDefault()}
      >
        <ContextMenu items={items} onClose={onClose} />
      </div>
    </>
  );
};
